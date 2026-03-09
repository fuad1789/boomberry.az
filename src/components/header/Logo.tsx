import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/assets/imgs/bloomberry logo.png"
        alt="Boomberry - Premium Chocolate"
        width={200}
        height={80}
        className="object-contain h-14 w-auto md:h-16 md:w-auto"
        priority
      />
    </div>
  );
}