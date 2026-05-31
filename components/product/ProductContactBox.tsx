import type { Product } from "@/lib/types/product";

interface ProductContactBoxProps {
  product: Product;
}

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "example@gmail.com";

const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "your_telegram_username";

const ProductContactBox: React.FC<ProductContactBoxProps> = ({ product }) => {
  const emailSubject = encodeURIComponent(`Запит щодо товару: ${product.name}`);
  const emailBody = encodeURIComponent(
    `Вітаю!\n\nМене цікавить товар: ${product.name}\n\nПосилання: /products/${product.slug.current}\n\nПідкажіть, будь ласка, деталі щодо наявності та замовлення.`
  );

  const telegramText = encodeURIComponent(
    `Вітаю! Мене цікавить товар: ${product.name}`
  );

  return (
    <div className="sticky top-28 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-neutral-950">Замовлення</h2>

      <p className="mt-3 text-sm leading-6 text-neutral-500">
        Це сайт-вітрина. Для уточнення наявності, розміру або оформлення
        замовлення зв’яжіться з нами.
      </p>

      <div className="mt-6 space-y-3">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`}
          className="flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Написати на email
        </a>

        <a
          href={`https://t.me/${TELEGRAM_USERNAME}?text=${telegramText}`}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
        >
          Написати в Telegram
        </a>
      </div>
    </div>
  );
};

export default ProductContactBox;