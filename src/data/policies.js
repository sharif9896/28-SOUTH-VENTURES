import { company } from './company.js';

// TEMPLATE policy text. Have these reviewed by a qualified legal professional before going live.
const n = company.legalName;
const b = company.brand;

export const policies = {
  shipping: {
    title: 'Shipping Policy',
    updated: 'October 2026',
    sections: [
      { h: 'Order processing', p: [`Orders placed on ${b} are processed within 24 hours on business days. Orders placed on weekends or public holidays are processed on the next business day.`] },
      { h: 'Delivery timelines', p: ['Metro cities: 2 to 4 business days.', 'Other cities and towns: 4 to 7 business days.', 'Remote locations may take longer. Delivery estimates are shown at checkout and on every product page.'] },
      { h: 'Shipping charges', p: ['Shipping is free for orders with a payable value of ₹499 or more. A flat fee of ₹49 applies to orders below ₹499.'] },
      { h: 'Order tracking', p: ['Once your order ships, you can follow it on the Track Order page using your order ID.'] },
      { h: 'Failed deliveries', p: ['If delivery fails because of an incorrect address or because you were unavailable, our courier partner will attempt delivery again. After repeated attempts the order may be returned to us and refunded after deducting any applicable shipping costs.'] },
    ],
  },
  returns: {
    title: 'Returns & Refund Policy',
    updated: 'October 2026',
    sections: [
      { h: 'Return window', p: ['You can request a return within 15 days of delivery for unopened, unused products in their original packaging.'] },
      { h: 'Damaged or wrong items', p: ['If you receive a damaged, defective or incorrect item, contact us within 48 hours of delivery with photos and your order ID so we can arrange a replacement or refund.'] },
      { h: 'Non-returnable items', p: ['For hygiene and safety reasons, opened or used beauty, personal care and wellness products cannot be returned unless they are defective.'] },
      { h: 'Refunds', p: ['Approved refunds are issued to the original payment method within 5 to 7 business days after the returned item is received and inspected. Cash on delivery orders are refunded to a bank account or UPI ID you provide.'] },
      { h: 'How to start a return', p: [`Email ${company.email} with your order ID and reason for return. Our team will guide you through the next steps.`] },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    sections: [
      { h: 'Who we are', p: [`This website is operated by ${n} ("we", "us"). This policy explains how we handle your personal information when you shop with ${b}.`] },
      { h: 'Information we collect', p: ['Contact details such as your name, mobile number, email and delivery address; order and payment-status information; and basic device and usage data such as pages visited.'] },
      { h: 'How we use it', p: ['To process and deliver your orders, provide customer support, send order updates, improve our website and, where you agree, share offers and new launches.'] },
      { h: 'Sharing', p: ['We share information only with service providers who help us run the business, such as couriers and payment partners, and where required by law. We do not sell your personal information.'] },
      { h: 'Security and retention', p: ['We use reasonable safeguards to protect your information and keep it only as long as needed for the purposes above or as required by law.'] },
      { h: 'Your rights', p: ['In line with applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may request access to, correction of or deletion of your personal data by contacting us.'] },
      { h: 'Contact', p: [`Questions about this policy? Write to ${company.email}.`] },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'October 2026',
    sections: [
      { h: 'Using this website', p: [`By using this website you agree to these terms. The site is operated by ${n}. You must be at least 18 years old, or use the site under the supervision of a parent or guardian, to place an order.`] },
      { h: 'Products and pricing', p: ['We try to display accurate product information and prices. In case of an error in price or availability, we may cancel the affected order and refund any payment made.'] },
      { h: 'Orders and payment', p: ['An order is confirmed only after you receive an order confirmation. We may decline or cancel orders for reasons such as stock unavailability or suspected misuse.'] },
      { h: 'Intellectual property', p: [`All content on this website, including logos, text and images, belongs to ${n} or its licensors and may not be copied without permission.`] },
      { h: 'Limitation of liability', p: ['To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of the website or products. Always check ingredients and patch test if you have sensitive skin or allergies.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of India. Courts at the location of our registered office will have jurisdiction, subject to applicable law.'] },
    ],
  },
};
