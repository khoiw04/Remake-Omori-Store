import { address } from "ip"
import { stripe } from "@/api/stripe/!_main_!"

type Information = {
    first: string;
    last: string;
    address1: string;
    address2: string;
    country: string;
    province: string;
    zip: string | undefined;
    phone: string;
    email: string;
}

export async function updateInformation(request: Request): Promise<Response> {
    const { email, address1, address2, country, province, zip, phone, first, last } = request.body as unknown as Information
    const targetCustomer = await stripe.customers.search({
        query: `email:"${email}"`,
        limit: 1
    })

    // If I can't find user in Stripe
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!targetCustomer) {
        try {
            const account = await stripe.customers.create({
                phone: phone === '' ? undefined : phone,
                email: email,
                name: first + "" + last,
                shipping: {
                    address: {
                        city: province === '' ? undefined : province,
                        state: province === '' ? undefined : province,
                        line1: address1 === '' ? undefined : address1,
                        line2: address2 === '' ? undefined : address2,
                        country: country === '' ? undefined : country,
                        postal_code: zip === '' ? undefined : zip
                    },
                    phone: phone === '' ? undefined : phone,
                    name: first + " " + last,
                },
                tax: {
                    ip_address: address(),
                },
            })
    
            return new Response(JSON.stringify({ account: account.id }))
        } catch (err) {
                console.error(err)
                return new Response(JSON.stringify({ error: "An error occurred when calling the Stripe API to create an account" }), {
                status: 500
            })
        }
    }

    // If I found
    try {
        const customer = await stripe.customers.update(
        targetCustomer.data[0].id,
            {
                phone: phone === '' ? undefined : phone,
                name: first + " " + last,
                shipping: {
                    address: {
                        city: province === '' ? undefined : province,
                        state: province === '' ? undefined : province,
                        line1: address1 === '' ? undefined : address1,
                        line2: address2 === '' ? undefined : address2,
                        country: country === '' ? undefined : country,
                        postal_code: zip === '' ? undefined : zip
                    },
                    phone: phone === '' ? undefined : phone,
                    name: first + " " + last,
                },
                tax: {
                    ip_address: address(),
                }
            }
        )

        return new Response(JSON.stringify({ account: customer.id }))
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "An error occurred when calling the Stripe API to create an account" }), {
            status: 500
        })
  }
}