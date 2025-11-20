import styles from "../style";
import { discount } from '../assets';
import GetStarted from "./GetStarted";

const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
       <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className='flex flex-row items-center py-[6px] px-4px bg-dicount-gradient rounded-[10xl] mb-3'>
            <img src={discount} alt="discount" className="w-48px h-[42px]"/>
             <p className={`${styles.paragraph} ml-2`}>
              <span className='text-white'>20%</span> Discount for {" "}
                <span className='text-white'>1 month</span> Account
             </p>
          </div>

          <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='flex-1 font-poppins font-semibold text-[72px]  text-white'>
              The Next <br/>{" "}
                <span className='text-gradient'>Generation 
                </span>{" "} 
            </h1>
                <div className="flex  mr-0">
                   <GetStarted />
                </div>
          </div>
          <h1 className="font-poppins font-semibold text-[68px] text-white leading-[100px]w-full">Payment Method.</h1>
       </div>
      
    </section>
  )


export default Hero
