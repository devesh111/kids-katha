"use client";

import { Mail, MapPinHouse } from "lucide-react";

const TermsPage = () => {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="flex flex-col max-w-5xl items-center justify-center mx-auto my-7 px-5 lg:px-0">
                <h1 className="text-center font-semibold text-3xl my-2">
                    Terms of Service
                </h1>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Introduction
                </h2>

                <p className="text-left w-full my-4 tracking-wide leading-relaxed">
                    Welcome to Kids Katha ("Platform"). These Terms and
                    Conditions ("Terms") govern your access to and use of the
                    Platform, owned and operated by VAxpert Business Solutions
                    ("we," "us," or "our"). By accessing, browsing, or using our
                    Platform, you agree to abide by these Terms. If you do not
                    agree, please do not use our Platform. Before you use our
                    platform, kindly read the present Terms and Conditions,
                    Privacy Policy and other Policies of the platform which
                    govern the various matters.
                </p>
                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Eligibility
                </h2>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    By using this Platform, you represent that you are over 18
                    years of age or have obtained parental or guardian consent
                    to use the Platform if you are a minor. [cite: 8] You must
                    also have the legal capacity to enter into this agreement
                    through yourself or through your parents/guardian. If you
                    are a minor and don't have an adult or parental supervision
                    while using our platform, kindly refrain from using our
                    platform. [cite: 10]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Subscription and Payment
                </h2>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            The Platform operates on a subscription model. Users
                            can access audiobooks by purchasing a subscription
                            plan.
                        </li>
                        <li>
                            Payment must be made via the approved payment
                            methods listed on the Platform.
                        </li>
                        <li>
                            Subscriptions are non-refundable unless otherwise
                            required by applicable law.
                        </li>
                        <li>
                            Any cancellation made after a billing cycle has
                            started will apply to the next billing period, and
                            no refunds will be issued for the current period
                            unless required by applicable law.
                        </li>
                        <li>Subscriptions may auto-renew unless cancelled.</li>
                        <li>
                            We reserve the right to change subscription fees
                            upon prior notice to users.
                        </li>
                        <li>
                            In the event, any user breaches any clauses of the
                            present Terms and Conditions or any related policies
                            of the platform, we, in our sole discretion reserve
                            the right to terminate the subscription and/or the
                            user account of the user. You agree that this is a
                            completely fair and equitable clause which has been
                            included in order to safeguard our legitimate
                            business and proprietary interests.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Account Registration and Security
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            To access content, users must register an account by
                            providing accurate and complete information. [cite:
                            21] Users are responsible for maintaining the
                            confidentiality of their login credentials such as
                            Usernames and Passwords. [cite: 23] Any unauthorized
                            use of an account must be reported immediately.
                            [cite: 26]
                        </li>
                        <li>
                            {" "}
                            If you feel that your account or your devices have
                            been compromised you are requested to immediately
                            block all your bank accounts, payment methods,
                            emails or any other accounts that could cause you
                            harm or loss. [cite: 25]
                        </li>
                        <li>
                            {" "}
                            If you feel that your account or your devices have
                            been compromised you are requested to immediately
                            block all your bank accounts, payment methods,
                            emails or any other accounts that could cause you
                            harm or loss. [cite: 25]
                        </li>
                        <li>
                            It is recommended that you attempt to recover your
                            account through 'Forgot Your Password' page on our
                            Platform Login page. [cite: 28]
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Content and Intellectual Property
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    All audiobooks, text, images, software, and other content
                    available on the Platform are protected by copyright and
                    intellectual property laws. [cite: 38] Users are granted a
                    limited, non-exclusive, non-transferable license to access
                    and use content for personal, non-commercial purposes, as
                    long as you remain a User and/or a Subscriber of the
                    Platform. [cite: 39]
                </p>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    You are not allowed to download any content on the platform
                    or to reproduce it, send it, forward it, upload it or make
                    it available for download at any other platform. [cite: 42]
                    Users must not reproduce, distribute, or create derivative
                    works from the Platform’s content without prior written
                    consent from the Company. [cite: 44]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    User Conduct
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    Users must not engage in any activity that violates
                    applicable laws or infringes on the rights of others. [cite:
                    46] Users shall not attempt to hack, scrape, or
                    reverse-engineer any part of the Platform. [cite: 47] Any
                    violation may result in account suspension or termination.
                    [cite: 48]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Privacy and Data Protection
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We collect and process user data in accordance with our
                    Privacy Policy. [cite: 50] By using the Platform, users
                    consent to the collection and processing of personal data as
                    outlined in the Privacy Policy. [cite: 51]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Disclaimers and Limitation of Liability
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    The Platform and its content are provided "as is" without
                    warranties of any kind. [cite: 54] We are not liable for any
                    interruptions, errors, or damages resulting from your use of
                    the Platform. [cite: 55] Our liability for any claims is
                    limited to the amount paid by the user for the subscription.
                    [cite: 56]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Third-Party Links and Services
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    The Platform may contain links to third-party websites or
                    services, which are not controlled by us. [cite: 63] We are
                    not responsible for the content, policies, or practices of
                    third-party services. [cite: 64]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Termination
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We reserve the right to suspend or terminate user accounts
                    at our discretion if we detect any violations of these
                    Terms. [cite: 66] If you wish to terminate our association,
                    you may cease to login to our Platform. [cite: 31] You may
                    also request to us through email to delete your account.
                    [cite: 34]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Governing Law and Dispute Resolution
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    These Terms shall be governed by the laws of India and any
                    disputes shall be resolved under the exclusive jurisdiction
                    of the courts in Delhi. [cite: 69] In case of any disputes,
                    parties shall first attempt mediation before initiating
                    legal proceedings. [cite: 70]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Amendments
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We reserve the right to modify these Terms at any time, and
                    the updated version will be posted on the Platform. [cite:
                    72] Continued use of the Platform constitutes acceptance of
                    the revised Terms. [cite: 73]
                </p>

                <h2 className="text-left w-full my-4 font-bold text-lg">
                    Contact Information
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed flex flex-col">
                    For any queries regarding these Terms, contact us at:
                    <span className="flex gap-2 items-center">
                        <Mail className="size-4" /> Email:{" "}
                        <a href="mailto:info@kidskatha.com">
                            info@kidskatha.com
                        </a>
                    </span>
                    Any Notices sent to Us should be sent to:
                    <span className="flex gap-2 items-center">
                        <MapPinHouse className="size-4" /> Address: 32/470,
                        sector 3, near KV-6, Pratap Nagar, Sanganer, Jaipur
                        302033
                    </span>
                </p>
            </div>
        </main>
    );
};

export default TermsPage;
