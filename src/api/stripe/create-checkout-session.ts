// https://docs.stripe.com/payments/bank-transfers/accept-a-payment?invoices=with
// https://docs.stripe.com/payments/collect-addresses?payment-ui=stripe-hosted&lang=node
// Dynamic Shipping Ratesh: https://docs.stripe.com/payments/checkout/custom-shipping-options?payment-ui=embedded-form&server-lang=node
import { stripe } from "./!_main_!"

interface Item {
    max: number
    name: string
    type: string
    price: number
    index: number
    quantity: number
    img: Array<string>
    tax_code: string
}

interface Info {
    name: string
    city: string
    line1: string
    line2: string
    phone: string
    email: string
    state: string
    country: string
    postal_code: string
}

interface Currency {
    name: string;
    code: string;
    transfer: string;
    lang: string;
}

export async function createCheckoutSession(request: Request): Promise<Response> {
    const { curr, item, shipping_fee, info } = request.body as unknown as { curr: Currency, item: Array<Item>, shipping_fee: Array<Promise<number>>, info: Info }
    const zeroDecimalCurrencies = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"]

    if (!info.email) {
      // For Guest
      const session = await stripe.checkout.sessions.create({
        adaptive_pricing: {
          enabled: true
        },
        shipping_address_collection: {
          allowed_countries: [curr.code, curr.code === 'US' ? undefined : 'US']
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? shipping_fee[0] : await shipping_fee[0] * 100,
                currency: curr.transfer
              },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 4,
                },
                maximum: {
                  unit: 'business_day',
                  value: 12,
                },
              },
              tax_code: 'txcd_92010001',
              tax_behavior: "exclusive"
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? shipping_fee[1] : await shipping_fee[1] * 100,
                currency: curr.transfer,
              },
              display_name: 'Express Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 6,
                },
              },
              tax_code: 'txcd_92010001',
              tax_behavior: "exclusive"
            },
          },
        ],
        currency: curr.transfer,
        line_items: item.map(s => ({
          adjustable_quantity: {
            maximum: s.max,
            enabled: true,
            minimum: 1
          },
          quantity: s.quantity,
          price_data: {
            currency: curr.transfer.toLowerCase(),
            product_data: {
              name: s.name + ' ' + `(${s.type})`,
              images: s.img,
              tax_code: s.tax_code,
              metadata: {
                type: s.type,
              }
            },
            tax_behavior: "exclusive",
            unit_amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? s.price : s.price * 100
          },
        })),
        mode: 'payment',
        payment_intent_data: {
          capture_method: 'automatic'
        },
        payment_method_data: {
          allow_redisplay: 'limited'
        },
        success_url: 'https://store-zero.khoiwn04.com/payment/successful' : 'http://localhost:3000/payment/successful',
        cancel_url: 'https://store-zero.khoiwn04.com' : 'http://localhost:3000/',
        locale: "auto",
        after_expiration: {
          recovery: {
            enabled: true,
          }
        },
        allow_promotion_codes: true,
        // Only work If my account verified
        // consent_collection: {
        //   payment_method_reuse_agreement: {
        //     position: "auto"
        //   },
        //   promotions: 'auto',
        //   terms_of_service: "required"
        // },
        // Get Shipping Adress by Stripe's Account
        // You cannot enable automatic tax calculation with `payment_intent_data[shipping]` set.
        billing_address_collection: "required",
        tax_id_collection: {
          enabled: true,
          required: "never"
        },
        automatic_tax: {
          enabled: true
        },
        wallet_options: {
          link: {
            display: "auto"
          }
        },
        submit_type: "pay",
        ui_mode: "hosted"
      })
    
      return new Response(JSON.stringify({ sessionId: session.id }))
    } else {
      const targetCustomer = await stripe.customers.search({
        query: `email:"${info.email}"`,
        limit: 1
      })
      const session = await stripe.checkout.sessions.create({
        adaptive_pricing: {
          enabled: true
        },
        shipping_address_collection: {
          allowed_countries: [curr.code, curr.code === 'US' ? undefined : 'US']
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? shipping_fee[0] : await shipping_fee[0] * 100,
                currency: curr.transfer
              },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
              tax_code: 'txcd_92010001',
              tax_behavior: "exclusive"
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? shipping_fee[1] : await shipping_fee[1] * 100,
                currency: curr.transfer,
              },
              display_name: 'Express Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 2,
                },
              },
              tax_code: 'txcd_92010001',
              tax_behavior: "exclusive"
            },
          },
        ],
        currency: curr.transfer,
        line_items: item.map(s => ({
          adjustable_quantity: {
            maximum: s.max,
            enabled: true,
            minimum: 1
          },
          quantity: s.quantity,
          price_data: {
            currency: curr.transfer.toLowerCase(),
            product_data: {
              name: s.name + `(${s.type})`,
              images: s.img,
              tax_code: s.tax_code,
              metadata: {
                type: s.type,
              }
            },
            tax_behavior: "exclusive",
            unit_amount: curr.transfer && zeroDecimalCurrencies.includes(curr.transfer.toUpperCase()) ? s.price : s.price * 100
          }
        })),
        mode: 'payment',
        success_url: 'https://omocat-remake.khoiwn04.com/payment/successful',
        cancel_url: 'https://omocat-remake.khoiwn04.com',
        customer: targetCustomer.data[0].id,
        customer_update: {
          address: "auto",
          name: "auto",
          shipping: "auto"
        },
        locale: "auto",
        after_expiration: {
          recovery: {
            enabled: true,
          }
        },
        allow_promotion_codes: true,
        // Only work If my account verified
        // consent_collection: {
        //   payment_method_reuse_agreement: {
        //     position: "auto"
        //   },
        //   promotions: 'auto',
        //   terms_of_service: "required"
        // },
        payment_intent_data: {
          capture_method: 'automatic',
          setup_future_usage: "off_session",
          receipt_email: info.email,
        },
        saved_payment_method_options: {
          payment_method_save: "enabled"
        },
        billing_address_collection: "required",
        tax_id_collection: {
          enabled: true,
          required: "never"
        },
        client_reference_id: targetCustomer.data[0].id,
        wallet_options: {
          link: {
            display: "auto"
          }
        },
        automatic_tax: {
          enabled: true
        },
        submit_type: "pay",
        ui_mode: "hosted",
      })

      if (typeof session.payment_intent === 'string') {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        await stripe.paymentIntents.capture(paymentIntent.id);
      }
  
      return new Response(JSON.stringify({ sessionId: session.id }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
      })
    }
  }