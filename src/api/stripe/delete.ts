import { stripe } from "./!_main_!"

type Information = {
    email: string;
}

export async function deleteAccount(request: Request): Promise<Response> {
    const email = request.body as unknown as Information
    try {
        const targetCustomer = await stripe.customers.search({
            query: `email:"${email}"`,
            limit: 1
        });
        if (targetCustomer.data.length > 0) {
            const deleted = await stripe.customers.del(targetCustomer.data[0].id)
            return new Response(JSON.stringify({ deleted }),{
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        } else {
            return new Response(JSON.stringify({ error: "We can't found the user in Stripe's system" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    } catch (err) {
            console.error(err)
            return new Response(JSON.stringify({ error: "An error occurred when calling the Stripe API to create an account" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}