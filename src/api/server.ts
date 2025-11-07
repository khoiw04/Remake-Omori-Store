import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { deleteAccount } from './stripe/delete'
import { createAccount } from './stripe/register'
import { updateInformation } from './stripe/update'
import { getInformation } from './stripe/get-information'
import { captureCheckout } from './stripe/capture_checkout-session'
import { createCheckoutSession } from './stripe/create-checkout-session'
import { cancelRefund, createFullRefundOrder } from './stripe/refund'
import { originDomains } from '@/!_main_!'

const app = new Elysia()
    .use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
    }))
    .post('/create-account', (request: Request) => createAccount(request))
    .delete('/delete-account', (request: Request) => deleteAccount(request))
    .post('/get-information', (request: Request) => getInformation(request))
    .post('/refund-full-order', (request: Request) => createFullRefundOrder(request))
    .post('/refund-canceling', (request: Request) => cancelRefund(request))
    .post('/update-account', (request: Request) => updateInformation(request))
    .post('/create-checkout-session', (request: Request) => createCheckoutSession(request))
    .post('/capture-checkout-session', (request: Request) => captureCheckout(request))

// CLOUDFLARE WORKER
export default {
    fetch: app.fetch
}