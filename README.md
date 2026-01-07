# 26Connect - Full Stack Production Ready

L'application sociale suisse ultime. Incluant Map Live, Moments (BeReal), Covoiturage, Entraide et Paiements Multiples.

**Version**: 1.0.0
**Date de référence CGU**: 04 Décembre 2025

## 🏗 Architecture

- **Frontend**: React, Tailwind, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript.
- **DB**: PostgreSQL, Prisma ORM.
- **Paiements**: Stripe (Cards, Apple Pay, Google Pay), PayPal, TWINT.

## 🚀 Setup Rapide (Docker)

1. **Environnement**
   ```bash
   cp .env.example .env
   # Remplir les clés STRIPE (Test mode)
   ```

2. **Lancement**
   ```bash
   docker-compose up --build
   ```

3. **Accès**
   - Frontend: http://localhost
   - API: http://localhost:3000/health
   - DB: localhost:5432

## 💳 Intégration Paiements

### 1. Stripe (Carte, Apple Pay, Google Pay)
Le backend expose `/api/pay/stripe/intent`.
- Le front envoie `amount`.
- Le back retourne `client_secret`.
- Le front utilise `<PaymentElement />` de Stripe pour finaliser.

### 2. TWINT (Suisse)
Simulation d'un flux "App-to-App".
- Le back retourne un lien `twint://`.
- Sur mobile, cela ouvre l'app TWINT.

## 🛡 Sécurité & Prod Checklist

- [ ] Changer tous les secrets dans `.env`.
- [ ] Activer HTTPS (SSL).
- [ ] Configurer les Webhooks Stripe en mode "Live".
- [ ] Vérifier la conformité PCI-DSS (Stripe gère la saisie carte).
- [ ] Base de données en mode privé (pas d'accès public).

## 📄 Mentions Légales
Conforme aux droits Suisse et Français. Voir `constants.ts` pour le texte intégral daté du 04/12/2025.
# 26connect
