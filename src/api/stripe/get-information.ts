import { stripe } from "@/api/stripe/!_main_!"

export async function getInformation(request: Request): Promise<Response> {
    const { email } = request.body as unknown as { email: string }

    try {
        if (!email) {
                return new Response(JSON.stringify({ error: "Email not found" }), {
                status: 500
            })
        }
        const targetCustomer = await stripe.customers.search({
            query: `email:"${email}"`,
            limit: 1
        })
        const paymentIntents = await stripe.paymentIntents.list({
            customer: targetCustomer.data[0].id,
            expand: ['data.shipping', 'data.payment_method']
        })

        const orderDetails = await Promise.all(
            paymentIntents.data.map(async (intent) => {
            const sessions = await stripe.checkout.sessions.list({
                payment_intent: intent.id,
                expand: ['data.shipping', 'data.shipping_address_collection', 'data.customer_details']
            })
            const refunds = await stripe.refunds.list({
                payment_intent: intent.id
            })

            if (intent.status === 'requires_capture') {
                await stripe.paymentIntents.capture(intent.id)
            }
            const hasRefunds = refunds.data.length > 0
            const refundDetails = hasRefunds ? {
                refunded: true,
                refundId: refunds.data[0].id,
                refundedPending: refunds.data[0].pending_reason,
                refundCurr: refunds.data[0].currency,
                refundMessage: refunds.data[0].metadata?.message,
                refundAmount: refunds.data.reduce((sum, refund) => sum + refund.amount, 0),
                refundDate: new Date(refunds.data[0].created * 1000).toISOString(),
                refundReason: refunds.data[0].reason || undefined,
                refundStatus: refunds.data[0].status
            } : {
                refunded: false
            }

            if (!sessions.data.length) return null

            const { id } = sessions.data[0]
            const sessionItems = await stripe.checkout.sessions.listLineItems(id, {
                expand: ['data.price.product']
            })


            const products = await Promise.all(
                sessionItems.data.map(async (session) => {
                if (!session.price || !session.price.product) return null

                const productId = typeof session.price.product === 'string'
                    ? session.price.product 
                    : session.price.product.id

                const product = await stripe.products.retrieve(productId)
                
                // Level
                // 1. intent (Payment Info)
                //  2. refund
                //  2. product
                //   3. session

                return {
                    id: product.id,
                    name: product.name,
                    images: product.images,
                    quantity: session.quantity,
                    metadata: product.metadata,
                    created: product.created,
                    currency: session.currency,
                    amount: session.amount_total,
                    shipping: intent.shipping?.address,
                    tracking_number: intent.shipping?.tracking_number,
                }
                })
            )

            return {
                paymentIntentId: intent.id,
                amount: intent.amount,
                status: intent.status,
                date: new Date(intent.created * 1000).toISOString(),
                products: products.filter(Boolean),
                refunded: refundDetails
            }
            })
        )

        return new Response(JSON.stringify({ 
            orders: orderDetails.filter(Boolean)
        }))
    } catch (err) {
            console.error(err)
            return new Response(JSON.stringify({ error: "An error occurred when calling the Stripe API to get all orders" }), {
            status: 500
        })
    }
}