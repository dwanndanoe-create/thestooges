"use client";

import { motion, AnimatePresence } from "framer-motion";


type AuthTransitionProps = {
  children: React.ReactNode;
  reverse?: boolean;
};


export function AuthTransition({
  children,
  reverse=false
}:AuthTransitionProps) {


return (

<AnimatePresence mode="wait">

<motion.div

initial={{
opacity:0,
x: reverse ? -30 : 30
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x: reverse ? 30 : -30
}}

transition={{
duration:.45,
ease:[0.22,1,0.36,1]
}}

className="h-full"

>

{children}

</motion.div>


</AnimatePresence>

);

}