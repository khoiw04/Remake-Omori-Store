import { AnimatePresence, motion } from "framer-motion";
import { useZustandStore } from "@/zustand/main";

export default function Fading() {
    const { click, setClick } = useZustandStore()

    return (
        <>
          {/* Fading Moblie */}

          <AnimatePresence>
            {click.burger && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              onClick={() =>
                {
                  setClick('burger', false)
                  setClick('currencyMobile', false)
                }
              }
              className='w-full h-dvh bg-black fixed z-20'
            />}
          </AnimatePresence>



          {/* Fading Search */}



          <AnimatePresence>
            {click.search && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setClick('search', false)}
              className='w-full h-dvh bg-black fixed z-20'
            />}
          </AnimatePresence>


          {/* Fading Cart */}



          <AnimatePresence>
            {click.cart && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setClick('cart', false)}
              className='w-full h-dvh bg-black fixed z-20'
            />}
          </AnimatePresence>



          {/* Fading Account */}



          <AnimatePresence>
            {click.login && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setClick('login', false)}
              className='w-full h-dvh bg-black fixed z-20'
            />}
          </AnimatePresence>
        </>
    )
}