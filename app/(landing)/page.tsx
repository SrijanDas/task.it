"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Navigation */}
            <motion.header
                className="container mx-auto py-4 px-4 flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2">
                    <div className="text-white">
                        <Calendar className="h-8 w-8" />
                    </div>
                    <span className="text-2xl font-bold">task.it</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="hover:text-white transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="#pricing"
                        className="hover:text-white transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#about"
                        className="hover:text-white transition-colors"
                    >
                        About Us
                    </Link>

                    <Link
                        href="#features"
                        className="hover:text-white transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="#blog"
                        className="hover:text-white transition-colors"
                    >
                        Blog
                    </Link>
                    <Link
                        href="#contact"
                        className="hover:text-white transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                <Button
                    asChild
                    className="bg-white hover:bg-gray-200 text-black"
                >
                    <Link href="/sign-in">Login or sign up</Link>
                </Button>
            </motion.header>

            {/* Hero Section */}
            <motion.section
                className="relative container mx-auto flex-1 flex flex-col md:flex-row items-center py-16 px-4 gap-8 min-h-screen"
                variants={stagger}
                initial="initial"
                animate="animate"
            >
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-screen overflow-hidden z-50">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover opacity-30"
                    >
                        <source src="/preview.gif" type="video/gif" />
                    </video>
                </div>

                <motion.div
                    className="relative md:w-1/2 space-y-6"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        The Ultimate Task Management Solution
                    </h1>
                    <p className="text-xl text-gray-300">
                        Stay ahead of those little but important things so you
                        can reclaim a flexible and spontaneous life!
                    </p>
                    <p className="text-lg text-gray-400 italic">
                        {
                            "Because let's face it, Trello boards are where tasks go to hibernate for the winter."
                        }
                    </p>
                    <Button className="bg-white hover:bg-gray-200 text-black px-8 py-6 text-lg">
                        Try Free for 7 Days
                    </Button>
                    <p className="text-sm text-gray-500">
                        No credit card required. Unlike some blue-branded boards
                        we know...
                    </p>
                </motion.div>
            </motion.section>

            {/* Features Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-12 text-center"
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        Meet{" "}
                        <span className="relative inline-block">
                            Task.it!
                            <span className="absolute bottom-1 left-0 right-0 h-2 bg-white opacity-50"></span>
                        </span>{" "}
                        Your Trello Intervention
                    </motion.h2>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={stagger}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="bg-black p-6 rounded-lg"
                            variants={fadeIn}
                        >
                            <CheckSquare className="h-10 w-10 text-white mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                Boards That Actually Work
                            </h3>
                            <p className="text-gray-400">
                                {`
                                 Unlike Trello, our boards don't mysteriously
                                hide your most important tasks behind seventeen
                                clicks.`}
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-black p-6 rounded-lg"
                            variants={fadeIn}
                        >
                            <CheckSquare className="h-10 w-10 text-white mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                Smart Task Organization
                            </h3>
                            <p className="text-gray-400">
                                Our system intelligently organizes your tasks,
                                so you spend less time managing and more time
                                doing.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-black p-6 rounded-lg"
                            variants={fadeIn}
                        >
                            <CheckSquare className="h-10 w-10 text-white mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                {"Notifications You'll Actually See"}
                            </h3>
                            <p className="text-gray-400">
                                {`We won't hide important alerts in a tiny bell
                                icon that you'll discover three weeks too late.`}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-12 text-center"
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        People Who Escaped The Blue Board Blues
                    </motion.h2>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        variants={stagger}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="bg-gray-900 p-6 rounded-lg"
                            variants={fadeIn}
                        >
                            <p className="italic mb-4">
                                {`
                                 "After years of losing tasks in Trello's endless
                                scroll of doom, task.it actually helps me finish
                                things. Revolutionary!"`}
                            </p>
                            <p className="font-bold">- Former Trello Hostage</p>
                        </motion.div>

                        <motion.div
                            className="bg-gray-900 p-6 rounded-lg"
                            variants={fadeIn}
                        >
                            <p className="italic mb-4">
                                {`
                                "I used to spend more time organizing my Trello
                                boards than actually doing work. With task.it,
                                I'm back to having a life."`}
                            </p>
                            <p className="font-bold">
                                - Recovered Board Addict
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="py-16 bg-white text-black"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Break Up with Trello?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        {`
                        It's not you, it's them. You deserve a task manager that
                        actually manages tasks.`}
                    </p>
                    <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
                        Start Your 7-Day Free Trial
                    </Button>
                    <p className="mt-4 text-sm">
                        {`
                        No awkward "we should still be friends" conversation
                        required.`}
                    </p>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-black py-8 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="text-white">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">task.it</span>
                        </div>

                        <div className="text-sm text-gray-500">
                            © {new Date().getFullYear()} task.it — Making task
                            management less painful since yesterday
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
