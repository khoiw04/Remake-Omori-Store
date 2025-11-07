import { stripe } from "./!_main_!"

export async function createFullRefundOrder(request: Request): Promise<Response> {
  try {
    const { paymentIntentId, information, total_amount, refunded_amount, reason, message } = request.body as unknown as { 
      total_amount: number
      refunded_amount: number
      information: Array<{
          id: string
          base: number
          amount: number
          name: string
          curr: string
          quantity: number
          max_quantity: number
      }>
      reason: string
      message: string
      paymentIntentId: string
    }

    if (!paymentIntentId) {
      return new Response(JSON.stringify({ 
        error: "Payment Intent ID is not exist" 
      }), { status: 400 })
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refunded_amount,
      reason: reason as "duplicate" | "fraudulent" | "requested_by_customer" | undefined,
      metadata: {
        message: message,
        total_amount: total_amount,
        ...information.reduce((acc, item, index) => {
          return {
            ...acc,
            [`${index}.id`]: item.id,
            [`${index}.base`]: item.base,
            [`${index}.name`]: item.name,
            [`${index}.curr`]: item.curr,
            [`${index}.quantity`]: item.quantity,
            [`${index}.max_quantity`]: item.max_quantity,
            [`${index}.total_amount_of_item`]: item.amount
          }
        }, {})
      }
    })

    return new Response(JSON.stringify({ 
      success: true,
      refund 
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
  } catch (error: any) {
    console.error("Error refunding:", error)
    return new Response(JSON.stringify({ 
      error: error.message || "Have an error when creating a refund" 
    }), { 
      status: 500,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export async function processPartialRefund(request: Request): Promise<Response> {
  try {
    const { 
      paymentIntentId, 
      amount, 
      reason, 
      refund_application_fee = false,
      reverse_transfer = false
    } = request.body as unknown as { 
      paymentIntentId: string, 
      amount: number,
      reason?: string,
      refund_application_fee?: boolean,
      reverse_transfer?: boolean
    }

    if (!paymentIntentId) {
      return new Response(JSON.stringify({ 
        error: "Payment Intent ID is not exist" 
      }), { status: 400 })
    }

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ 
        error: "The amount has been more than 0" 
      }), { status: 400 })
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount,
      reason: reason as "duplicate" | "fraudulent" | "requested_by_customer" | undefined,
      refund_application_fee,
      reverse_transfer
    })

    return new Response(JSON.stringify({ 
      success: true, 
      refund 
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
  } catch (error: any) {
    console.error("Erorr checking a part of refund", error)
    return new Response(JSON.stringify({ 
      error: error.message || "Meet an error when checking a part of refund" 
    }), { 
      status: 500,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export async function checkRefundStatus(request: Request): Promise<Response> {
  try {
    const { refundId } = request.body as unknown as { refundId: string }

    if (!refundId) {
      return new Response(JSON.stringify({ 
        error: "Refund ID is not exist" 
      }), { status: 400 })
    }

    const refund = await stripe.refunds.retrieve(refundId)

    return new Response(JSON.stringify({ 
      success: true,
      status: refund.status,
      pending_reason: refund.pending_reason,
      refund 
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
  } catch (error: any) {
    console.error("Error checking refund:", error)
    return new Response(JSON.stringify({ 
      error: error.message || "Meet an error when checking refund" 
    }), { 
      status: 500,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export async function updateRefundMetadata(request: Request): Promise<Response> {
  try {
    const { refundId, metadata } = request.body as unknown as { 
      refundId: string, 
      metadata: Record<string, string> 
    }

    if (!refundId) {
      return new Response(JSON.stringify({ 
        error: "Refund ID is not exist" 
      }), { status: 400 })
    }

    const refund = await stripe.refunds.update(refundId, {
      metadata
    })

    return new Response(JSON.stringify({ 
      success: true, 
      refund 
    }), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error("Error updating refund:", error)
    return new Response(JSON.stringify({ 
      error: error.message || "Meet an error when updating refund" 
    }), { 
      status: 500,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export async function cancelRefund(request: Request): Promise<Response> {
  try {
    const { refundId } = request.body as unknown as { 
      refundId: string
    }

    if (!refundId) {
      return new Response(JSON.stringify({ 
        error: "Refund ID is not exist" 
      }), { status: 400 })
    }

    const refund = await stripe.refunds.cancel(refundId)

    return new Response(JSON.stringify({ 
      success: true,
      refund
    }), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error("Error canceling refund:", error)
    return new Response(JSON.stringify({ 
      error: error.message || "Meet an error when canceling refund" 
    }), { 
      status: 500,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
    })
  }
}