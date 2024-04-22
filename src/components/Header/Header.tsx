import Logo from "../../assets/imgs/Logo.svg";

export function Header() {
  return (
    <div className="flex items-center justify-between mt-2 mb-5">
      <img src={Logo} className="h-20 md:h-24 lg:h-32" alt="logo" />
    </div>
  );
}
