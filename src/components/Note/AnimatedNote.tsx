import React from "react";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useInvertedBorderRadius } from "../../utils/use-inverted-border-radius";
import { useRouter } from "next/router";
// import { CardData } from "../types";
// import { ContentPlaceholder } from "./ContentPlaceholder";
// import { Title } from "./Title";
// import { Image } from "./Image";
// import { openSpring, closeSpring } from "./animations";
// import { useScrollConstraints } from "../utils/use-scroll-constraints";
// import { useWheelScroll } from "../utils/use-wheel-scroll";

// interface Props extends CardData {
//   isSelected: boolean;
//   history: {
//     push: (route: string) => void;
//   };
// }

const openSpring = { type: "spring", stiffness: 200, damping: 30 };
const closeSpring = { type: "spring", stiffness: 300, damping: 35 };

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
// const dismissDistance = 150;

export const AnimatedNote = React.memo(
  function CardFn({
    isSelected,
    note,
  }: // title,
  // category,
  // history,
  // pointOfInterest,
  // backgroundColor
  any) {
    const router = useRouter();
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 99999 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = React.useRef(null);
    // const constraints = useScrollConstraints(cardRef, isSelected);

    // function checkSwipeToDismiss() {
    //   y.get() > dismissDistance && history.push("/");
    // }

    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(99999);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = React.useRef(null);
    // useWheelScroll(
    //   containerRef,
    //   y,
    //   constraints,
    //   checkSwipeToDismiss,
    //   isSelected
    // );

    return (
      <>
        <li
          ref={containerRef}
          className="group/li relative mb-4 flex h-fit w-full break-inside-avoid flex-col rounded-lg border border-black/20 bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-lg dark:border-white/20 dark:bg-gray-900 dark:hover:shadow-black sm:w-60"
          onClick={() => {
            router.push(
              {
                href: `${router.pathname}?noteId=${note.id}`,
                // pathname: `/?noteId=[noteId]`,
                query: { noteId: note.id },
              },
              `/note/${note.id}`
            );
          }}
        >
          <Overlay isSelected={isSelected} />
          <div className={`card-content-container ${isSelected && "open"}`}>
            <motion.div
              ref={cardRef}
              className="card-content"
              style={{ ...inverted, zIndex, y }}
              animate={
                isSelected
                  ? { width: "100%", height: "100%" }
                  : { width: "auto", height: "auto" }
              }
              layout
              // layoutTransition={isSelected ? openSpring : closeSpring}
              transition={isSelected ? openSpring : closeSpring}
              // drag={isSelected ? "y" : false}
              // dragConstraints={constraints}
              // onDrag={checkSwipeToDismiss}
              onUpdate={checkZIndex}
            >
              {/* <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
            /> */}
              {/* <Title title={title} category={category} isSelected={isSelected} /> */}
              <h1>{note?.title || ""}</h1>
              <p>{note?.content || ""}</p>
              {/* <ContentPlaceholder /> */}
            </motion.div>
          </div>
          {/* {!isSelected && <Link href="/" className={`card-open-link`} />} */}
          <style jsx>{`
            .card-content-container {
              /* width: 100%;
            height: 100%; */
              position: relative;
              display: block;
              pointer-events: none;
            }
            .card-content-container.open {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              position: fixed;
              /* z-index: 1; */
              overflow: hidden;
              padding: 40px 0;
            }
            .card-content {
              pointer-events: auto;
              position: relative;
              border-radius: 20px;
              background: #1c1c1e;
              overflow: hidden;
              width: 100%;
              height: 100%;
              margin: 0 auto;
              border: 2px solid red;
            }

            .open .card-content {
              height: auto;
              max-width: 700px;
              max-height: 90vh;
              overflow-y: auto;
            }
            .card-open-link {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          `}</style>
        </li>
      </>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

const Overlay = ({ isSelected }: { isSelected: boolean }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? "auto" : "none" }}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] bg-black/60"
      onClick={() => router.push("/")}
    >
      {/* <Link href="/" /> */}
    </motion.div>
  );
};
