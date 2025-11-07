import Stripe from "stripe"

export const stripe = new Stripe('sk_test_51RFrLAQcTj21UAyjbX23etNg0pm5f6DBb35FELVZANNJgUzicF10cMMzWHr9HUPIzLPVQsHpcGmyc0eit5CqfGdJ00ffEUjNZ4', {
    apiVersion: "2025-10-29.clover",
    typescript: true
})

export const originDomains = [
    'https://omocat-remake.khoi-w04.workers.dev',
    'https://omocat-remake.khoiwn04.com',
    'http://localhost:3000',
    'http://localhost:4173',
]