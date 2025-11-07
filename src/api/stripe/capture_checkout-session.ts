import { stripe } from "./!_main_!"

const endpointSecret = process.env.STRIPE_DESTINATION_KEY as string

export async function captureCheckout(request: Request): Promise<Response> {
    let event;
    try {
        const signature = request.headers.get('stripe-signature')
        const body = await request.text()
        if (signature)
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            endpointSecret
        );
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err);
        return new Response('Error', { 
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    switch (event?.type) {
        case 'checkout.session.completed':
            { const session = event.data.object

            const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string)
            await stripe.paymentIntents.capture(paymentIntent.id)

            break }
        default:
            console.log(`Unhandled event type ${event?.type}`);
    }

    return new Response('Webhook received', {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
