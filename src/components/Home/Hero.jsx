import { SearchBar } from "../SearchBar/SearchBar";
import { BtnInfo } from "../Stateless/BtnInfo";
import content from "@/content/home.json";

export function Hero() {
    return (
      <section>
        <div className={`home_banner relative pt-[100px] pb-[190px] text-white`} > 

          <div className="container relative z-10 flex flex-col items-center gap-5 text-center">
            <div className="flex items-center justify-center">
              <BtnInfo img={content.hero.btnInfo.img} >{content.hero.btnInfo.text}</BtnInfo>
            </div>
  
            <h1>{content.hero.title}</h1>
            <p className="heading-6 heading-6-medium">
              {content.hero.desc.one} <br className="d-none d-md-block" />{" "}
              {content.hero.desc.two}
            </p>
          </div>
        </div>
  
        <div className="container relative top-[-110px] lg:top-[-103px]">
          <SearchBar />
        </div>
      </section>
    );
}  