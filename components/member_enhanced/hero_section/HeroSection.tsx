import Image from "next/image";

export function HeroSection(){
    return(
   <div className="relative min-h-screen  bg-white overflow-hidden">
   {/* <Image
    src="/profile/bg.png"
    alt="card image"
    fill
    className="object-contain  z-0"
  /> */}
  <Image
    src="/profile/Maleh.png"
    alt="card image"
    fill
    className="object-contain  z-1"
  />
     {/* <div className="absolute bg-black/70  lg:bg-black/10 inset-0" /> */}
  <div className="relative z-10 border border-amber-50 min-w-[98%] min-h-[99vh] p-4 flex justify-between flex-col-reverse overflow-y-auto">
    <div className=" flex gap-4 text-white text-4xl lg:text-7xl font-bold  lg:inline mb-[10%]">
        <p className="text-black">MALCOM</p>
        <p className="text-black">DAVID</p>
        <p className="text-black">APUNDA</p>
    
    </div>
      <div className=" flex gap-4 text-white text-4xl lg:text-7xl font-bold  lg:inline mb-[10%]">
        <p className="text-black">MALCOMmm</p>
        <p className="text-black">DAVID</p>
        <p className="text-black">APUNDA</p>
    
    </div>
    
  </div>

</div>
    )
}