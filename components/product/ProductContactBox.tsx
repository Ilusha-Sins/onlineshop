import type { Product } from "@/lib/types/product";
import Price from "@/components/ui/Price";

interface ProductContactBoxProps {
  product: Product;
}

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "example@gmail.com";

const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "your_telegram_username";

const ProductContactBox: React.FC<ProductContactBoxProps> = ({ product }) => {
  const normalizedTelegramUsername = TELEGRAM_USERNAME.replace(/^@/, "");

  const emailSubject = encodeURIComponent(`Запит щодо товару: ${product.name}`);
  const emailBody = encodeURIComponent(
    `Вітаю!\n\nМене цікавить товар: ${product.name}\n\nПосилання: /products/${product.slug.current}\n\nПідкажіть, будь ласка, деталі щодо наявності, розміру та замовлення.`
  );

  const telegramText = encodeURIComponent(
    `Вітаю! Мене цікавить товар: ${product.name}`
  );

  const telegramHref = normalizedTelegramUsername
    ? `https://t.me/${normalizedTelegramUsername}?text=${telegramText}`
    : undefined;

  return (
    <aside className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] xl:sticky xl:top-28 xl:self-start">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
        Замовлення
      </p>

      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
        Уточнити деталі
      </h2>

      <p className="mt-4 text-sm leading-6 text-neutral-500">
        Це сайт-вітрина. Для уточнення наявності, розміру або оформлення
        замовлення зв’яжіться з нами зручним способом.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-neutral-200/80 bg-[#F7F7F5] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
          Товар
        </p>

        <h3 className="mt-3 text-base font-semibold text-neutral-950">
          {product.name}
        </h3>

        <div className="mt-2">
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>

        <p className="mt-4 text-sm font-medium text-neutral-600">
          {product.isAvailable === false ? "Немає в наявності" : "В наявності"}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`}
          className="flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold !text-white transition hover:bg-neutral-800"
        >
          Написати на email
        </a>

        {telegramHref ? (
          <a
            href={telegramHref}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
          >
            Написати в Telegram
          </a>
        ) : null}
      </div>

      <p className="mt-5 text-xs leading-5 text-neutral-400">
        У повідомленні автоматично буде вказана назва товару, щоб швидше
        уточнити деталі.
      </p>
    </aside>
  );
};

export default ProductContactBox;