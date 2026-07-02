# MN Animat Next Store

Versão profissional da loja MN Animat construída com:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion for React
- Lucide Icons
- `next/image` para otimização das imagens

## Recursos

- identidade visual premium preta e laranja
- hero rotativo e animado
- imagens em alta resolução
- catálogo responsivo com busca e filtros
- favoritos persistentes no navegador
- carrinho persistente com quantidades
- modal completo de cada produto
- personalizador de vestuário com cor, modelo, tamanho, texto, upload e preço estimado
- formulário de contato demonstrativo
- animações com suporte a `prefers-reduced-motion`
- metadados para SEO e compartilhamento
- pronto para GitHub e Vercel

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar produção

```bash
npm run lint
npm run build
npm run start
```

O projeto foi validado com `npm run lint` e `npm run build`.

## Publicar na Vercel

1. Envie toda a pasta para um repositório GitHub.
2. Na Vercel, importe o repositório.
3. Em **Application Preset**, selecione **Next.js**.
4. Mantenha **Root Directory** como `./`, desde que `package.json` esteja na raiz.
5. Não é necessário preencher manualmente Build Command ou Output Directory.
6. Clique em **Deploy**.

## Domínio mnanimat.xyz

Depois do deploy:

1. Abra o projeto na Vercel.
2. Entre em **Settings > Domains**.
3. Adicione `mnanimat.xyz` e `www.mnanimat.xyz`.
4. Configure os registros DNS informados pela Vercel.

## Estrutura principal

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  storefront.tsx
data/
  products.ts
public/
  images/
package.json
next.config.ts
postcss.config.mjs
vercel.json
```

## Integrações futuras

- Mercado Pago, Stripe, Asaas ou PagBank
- WhatsApp com resumo automático do pedido
- Supabase ou Firebase para produtos e pedidos
- CMS para edição do catálogo
- autenticação e painel administrativo
- upload real de artes em nuvem
