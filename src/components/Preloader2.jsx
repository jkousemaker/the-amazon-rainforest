"use client";
import {
  AnimatePresence,
  motion,
  useTransform,
  cubicBezier,
  useScroll,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { useStore } from "@/store";

import { TextureButton } from "./ui/TextureButton";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/core/dialog";
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelHeader,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "@/components/core/floating-panel";
import { Volume2, VolumeX } from "lucide-react";
import AudioPlayer from "react-h5-audio-player";
import { BorderTrail } from "./core/border-trail";
import useScreenSize from "@/hooks/useScreenSize";
const tileAmount = 20;
export default function Preloader2() {
  const [newsletterDialog, setNewsletterDialog] = useState(false);
  const { introLoaded, intro } = useStore();

  return (
    <motion.div
      initial="open"
      animate={introLoaded ? "closed" : "open"}
      className="fixed z-[999] inset-0 pointer-events-none grid place-items-center"
    >
      <header className="absolute z-50 top-0 left-0 w-full flex flex-row justify-between px-5 py-4">
        <motion.div
          layout
          className="bg-white"
          style={{ borderRadius: "999999px" }}
        >
          {introLoaded && (
            <motion.div className="size-20">
              <LogoContainer />
            </motion.div>
          )}
        </motion.div>
        {!intro && <NavMenu />}

        <NewsletterDialog
          newsletterDialog={newsletterDialog}
          setNewsletterDialog={setNewsletterDialog}
        />
      </header>
      {!introLoaded && (
        <div className="size-60 md:size-[18rem]">
          <motion.div
            className="relative size-full z-50 "
            variants={{
              open: {
                y: 0,
              },
              closed: {
                y: "-100%",
              },
            }}
            transition={{
              type: "tween",
              duration: 1,
              ease: [0.78, 0.15, 0.84, 0.67],
            }}
          >
            <LogoContainer />
          </motion.div>
        </div>
      )}
      <motion.div
        initial="open"
        animate={introLoaded ? "closed" : "open"}
        transition={{ staggerChildren: 0.1 }}
        className="absolute z-0 inset-0   flex flex-row justify-center items-center til pointer-events-none"
      >
        {Array.from({ length: tileAmount }).map((_, i) => {
          return <Tile key={i} />;
        })}
      </motion.div>
    </motion.div>
  );
}

function Tile({}) {
  const container = useRef(null);
  const screenSize = useScreenSize(); // { width, height }
  const middleIndex = Math.floor(20 / 2);
  const { scrollYProgress } = useScroll({
    target: container,
    offsets: ["start end", "start start"],
  });
  const distanceFromMiddle = Math.abs(-middleIndex);
  const isActive = scrollYProgress.get() > 0.5;
  const y = useTransform(
    scrollYProgress,
    [distanceFromMiddle, 1],
    [screenSize.height, 0],
    { clamp: true, ease: cubicBezier(0.31, 0.58, 0.48, 0.99) }
  );
  return (
    <motion.div
      variants={{
        open: {
          y: 0,
        },
        closed: {
          y: "-100%",
        },
      }}
      transition={{
        type: "tween",
        duration: 1,
        ease: [0.78, 0.15, 0.84, 0.67],
      }}
      className="relative flex-1 flex  h-full w-full"
    >
      <motion.div className="h-full flex-1 bg-gradient-to-r from-primaryBackground to-black relative  w-20 pointer-events-auto" />
    </motion.div>
  );
}

function NavMenu() {
  const middleIndex = Math.floor(tileAmount / 2);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex flex-row flex-nowrap justify-between items-center gap-5 fixed z-[99999999999] w-full">
      <div className="">
        <TextureButton variant="minimal" className=" pointer-events-auto">
          About us
        </TextureButton>
        <TextureButton
          variant="minimal"
          onClick={() => {
            setNewsletterDialog(true);
          }}
          className=" pointer-events-auto"
        >
          Newsletter
        </TextureButton>

        <TextureButton variant="accent" className=" pointer-events-auto">
          Download
        </TextureButton>
        <AudioButton />
      </div>

      <NavMenuButton
        variants={{
          open: {
            y: 0,
          },
          closed: {
            y: "-100%",
          },
        }}
        transition={{
          type: "tween",
          duration: 1,
          ease: [0.78, 0.15, 0.84, 0.67],
        }}
        set={setMenuOpen}
      />
    </nav>
  );
}

function NavMenuButton({ set }) {
  return (
    <div className="relative flex flex-row justify-between w-full  top-0 right-0 h-[40px] cursor-pointer rounded-[25px] overflow-hidden">
      <motion.button className="relative size-full pointer-events-auto">
        <div
          className="size-full bg-[#c9fd74]"
          onClick={() => {
            set((prev) => !prev);
          }}
        >
          <PerspectiveText label="Menu" />
        </div>
        <motion.div
          transition={{
            duration: 0.5,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
          }}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label="Close" />
        </motion.div>
      </motion.button>
    </div>
  );
}

function PerspectiveText({ label }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full transform-style-preserve-3d transition-transform duration-[0.75s] cubic-bezier-[0.76,0,0.24,1]">
      <p className="m-0 pointer-events-none uppercase">{label}</p>

      <p className="m-0 pointer-events-none uppercase">{label}</p>
    </div>
  );
}

function AudioButton() {
  const { intro } = useStore();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (intro) {
      setPlaying(true);
    }
  }, [intro]);
  return (
    <>
      <AudioPlayer
        src="/background.mp3"
        autoPlay={playing}
        loop
        controls={false}
        muted={muted}
        className="relative z-[999999] pointer-events-auto hidden"
      />
      <TextureButton
        variant="destructive"
        size="icon"
        className=" aspect-square pointer-events-auto"
        onClick={() => setMuted((prev) => !prev)}
      >
        {muted ? <VolumeX /> : <Volume2 />}
      </TextureButton>
    </>
  );
}

function NewsletterPanel({ handleSubmit }) {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Add Note"
        className="flex items-center space-x-2 px-4 py-2 pointer-events-auto bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <span>Newsletter</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80 pointer-events-auto">
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="note-input">Note</FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

function NewsletterDialog({ newsletterDialog, setNewsletterDialog }) {
  const [loading, setLoading] = useState(false);
  const customVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      y: "-100%",
      x: "100%",
      rotate: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
      y: "100%",
      transition: {
        type: "spring",
        duration: 0.5,
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const customTransition = {
    type: "spring",
    bounce: 0,
    duration: 1,
  };
  return (
    <Dialog
      open={newsletterDialog}
      onOpenChange={setNewsletterDialog}
      variants={customVariants}
      transition={customTransition}
    >
      <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white">
            Join our newsletter
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            Enter your email address to receive updates.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col space-y-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm"
            placeholder="Enter your email"
          />
          <TextureButton
            onClick={() => setLoading(true)}
            loading={loading}
            className="w-fit ml-auto"
          >
            Subscribe
          </TextureButton>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

function LogoContainer() {
  return (
    <motion.div
      layoutId="layout-page-logo"
      transition={{
        layout: {
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      }}
      className="relative z-50 w-full h-full pointer-events-auto"
    >
      <Logo />
    </motion.div>
  );
}
