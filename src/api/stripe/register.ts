import { stripe } from "@/api/stripe/!_main_!"

type Information = {
    first: string;
    last: string;
    email: string;
    password: string;
    checked: boolean;
    country: string;
}

export async function createAccount(request: Request): Promise<Response> {
    const { email, first, last } = request.body as unknown as Information
    try {
        const account = await stripe.customers.create({
            email: email,
            name: first + "" + last
        })

        return new Response(JSON.stringify({ account: account.id }))
    } catch (err) {
            console.error(err)
            return new Response(JSON.stringify({ error: "An error occurred when calling the Stripe API to create an account" }), {
            status: 500
        })
    }
}