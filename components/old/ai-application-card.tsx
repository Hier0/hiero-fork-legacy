"use client";

import React, { useState, useEffect } from "react";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SaveCardForm from "@/components/checkout/ui/payments/save-card-form";
import SignInStep from "@/components/checkout/ui/sign-in-step";
import Footer from "@/components/checkout/ui/checkout-footer";
import ConnectToHiero from "@/components/checkout/ui/connect";
import CheckoutHeader from "@/components/checkout/ui/checkout-header";
import Steps from "@/components/checkout/ui/steps";
import AppInfo from "@/components/checkout/ui/app-info";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

type AIApp = {
	id: string;
	name: string;
	icon: React.ReactNode;
	color: string;
	loginUrl: string;
	uuid: string;
	rating: string;
	multiplier: string;
	tokenPrice: string;
	amountSpent: number;
	usage: number;
	slug: string;
};

type AIAppProps = {
	app: AIApp;
};

export function AIApplicationCard({ app }: AIAppProps) {
	const router = useRouter();
	const [uuid, setUUID] = useState<string | null>(null);
	const [user, setUser] = useState<Session["user"] | null>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [cardSaved, setCardSaved] = useState(false);
	const avgSpent = 6.73;
	const { data: session } = useSession();

	useEffect(() => {
		const checkUser = async () => {
			const user = session?.user;
			setUser(user ?? null);
			if (user) setCurrentStep(1);
		};
		checkUser();
	}, []);

	const handleGenerateUUID = async () => {
		try {
			const newUUID = await generateUserConnectionKey(app.id);
			setUUID(newUUID);
			setCurrentStep(2);
		} catch (error) {
			console.error("Error generating UUID:", error);
		}
	};

	const handleCardSaved = () => {
		setCardSaved(true);
		setCurrentStep(2);
	};

	const handleSignIn = () => {
		setCurrentStep(1);
	};

	const handleGoToDashboard = () => {
		router.push(`/protected/dashboard/apps`);
	};

	const steps = [
		{ title: "Sign In" },
		{ title: "Save Card" },
		{ title: "Connect" },
	];

	return (
		<div className="min-h-screen flex items-center justify-center pb-16">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-[95%] max-w-3xl h-[90vh] flex flex-col bg-white border-4 sm:border-8 border-black shadow-[12px_12px_0_0_#000] sm:shadow-[24px_24px_0_0_#000] transition-all duration-300 hover:shadow-[6px_6px_0_0_#000] sm:hover:shadow-[12px_12px_0_0_#000] hover:translate-x-1 hover:translate-y-1 sm:hover:translate-x-3 sm:hover:translate-y-3"
			>
				<div className="flex-grow flex flex-col p-4 sm:p-6">
					{/* Header */}
					<CheckoutHeader />

					{/* App Info */}
					<AppInfo name={app.name} avgSpent={avgSpent} />

					{/* Action Area */}
					<motion.div
						className="flex-grow flex flex-col items-center justify-center"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<AnimatePresence mode="wait">
							{!user ? (
								<SignInStep onSignIn={handleSignIn} />
							) : !cardSaved ? (
								<motion.div
									key="savecard"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
									className="w-full"
								>
									<SaveCardForm onSave={handleCardSaved} />
								</motion.div>
							) : (
								<ConnectToHiero
									appName={app.name}
									onGenerateUUID={handleGenerateUUID}
									onGoToDashboard={handleGoToDashboard}
								/>
							)}
						</AnimatePresence>
					</motion.div>

					{/* Steps */}
					<Steps steps={steps} currentStep={currentStep} />
				</div>

				<Footer />
			</motion.div>
		</div>
	);
}
