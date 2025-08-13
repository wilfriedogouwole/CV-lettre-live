'use server'

import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export const handleCheckout = async (priceId: string) => {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error('Utilisateur non authentifié')
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: user?.email || undefined,
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    metadata: { userId }
  })

  if (!stripeSession.url) {
    throw new Error('Erreur lors de la création de la session Stripe')
  }

  redirect(stripeSession.url)
}