import Link from "next/link";

import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-[#F7F7F5]">
      <Container className="py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-black tracking-tight text-neutral-950"
            >
              <span className="h-2 w-2 rounded-full bg-neutral-950" />
              Studio
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">
              Мінімальна онлайн-вітрина одягу для щоденних образів, добірок і
              швидкого зв’язку щодо замовлення.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-950">Навігація</h2>

            <div className="mt-4 space-y-3 text-sm text-neutral-500">
              <Link href="/" className="block transition hover:text-neutral-950">
                Головна
              </Link>

              <Link
                href="/brands"
                className="block transition hover:text-neutral-950"
              >
                Бренди
              </Link>

              <Link
                href="/search"
                className="block transition hover:text-neutral-950"
              >
                Пошук
              </Link>

              <Link
                href="/favorites"
                className="block transition hover:text-neutral-950"
              >
                Обране
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-950">Контакт</h2>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Для уточнення наявності, розміру або деталей замовлення відкрий
              сторінку товару та скористайся контактними кнопками.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200/80 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Studio. Усі права захищено.</p>
          <p>Світла мінімальна вітрина одягу.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;