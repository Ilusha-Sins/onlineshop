const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} MyShop. Усі права захищено.</p>

        <p>Стильна вітрина одягу для щоденних образів.</p>
      </div>
    </footer>
  );
};

export default Footer;