"use client";

import { Mail, MapPinHouse } from "lucide-react";

const PrivacyPolicyPage = () => {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="flex flex-col max-w-5xl items-center justify-center mx-auto my-7 px-5 lg:px-0">
                <h1 className="text-center font-semibold text-3xl my-2">
                    Privacy Policy
                </h1>
                <p className="text-left w-full my-4 tracking-wide leading-relaxed">
                    Welcome to Kids Katha ("Platform"), owned and operated by
                    VAxpert Business Solutions ("Company," "we," "us," or
                    "our"). We value your privacy and are committed to
                    protecting your personal data. This Privacy Policy outlines
                    how we collect, use, store, share, and protect your
                    information when you use our Platform. This Privacy Policy
                    complies with the General Data Protection Regulation (GDPR),
                    Digital Personal Data Protection Act, 2023 (DPDP-India),
                    California Consumer Privacy Act (CCPA), UK GDPR, Personal
                    Information Protection and Electronic Documents Act
                    (PIPEDA-Canada), and other applicable global privacy laws.
                </p>
                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    1. DATA CONTROLLER
                </h2>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>1.1</strong> For users in the European Economic Area
                    (EEA), UK, and other jurisdictions, VAxpert Business
                    Solutions is the data controller responsible for your
                    personal data.
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>1.2</strong> For inquiries related to data privacy,
                    contact us at:
                </p>
                <p className="text-left flex flex-col w-full my-2 tracking-wide leading-relaxed">
                    <span className="flex gap-2 items-center">
                        <Mail className="size-4" /> Email:{" "}
                        <a href="mailto:info@kidskatha.com">
                            info@kidskatha.com
                        </a>
                    </span>
                    <span className="flex gap-2 items-center">
                        <MapPinHouse className="size-4" /> Address: 32/470,
                        Sector 3, Near KV-6, Pratap Nagar, Sanganer, Jaipur
                        302033
                    </span>
                </p>
                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    2. DATA WE COLLECT
                </h2>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    When you use our Platform, we may collect the following
                    categories of personal data:
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>2.1</strong> Information You Provide
                    <ul className="list-disc list-inside my-2">
                        <li>
                            <strong>Account Information:</strong> Name, email
                            address, phone number, date of birth, password.
                        </li>
                        <li>
                            <strong>Payment Information: </strong> Credit/debit
                            card details, billing address (processed securely by
                            third-party payment processors). Separate Privacy
                            Policies may apply for each of our third-party
                            service providers.
                        </li>
                        <li>
                            <strong>User Preferences: </strong> Subscription
                            choices, audiobook preferences, language settings.
                        </li>
                        <li>
                            <strong>Customer Support Data: </strong> Queries,
                            complaints, or interactions with our support team.
                        </li>
                    </ul>
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>2.2</strong> Automatically Collected Information
                    <ul className="list-disc list-inside my-2">
                        <li>
                            <strong>Device Information:</strong> IP address,
                            browser type, operating system.
                        </li>
                        <li>
                            <strong>Usage Data: </strong> Pages visited,
                            listening history, search queries.
                        </li>
                        <li>
                            <strong>Cookies and Tracking Technologies: </strong>{" "}
                            We use cookies and similar tracking technologies for
                            analytics and improving user experience. You have
                            the option to accept or deny or allow limited access
                            to Cookies when visiting our website.
                        </li>
                        <li>Location of the Device</li>
                    </ul>
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>2.3</strong> Third-Party Data. We may receive
                    personal data from:
                    <ul className="list-disc list-inside my-2">
                        <li>Payment service providers.</li>
                        <li>
                            Social media platforms (if you register via Google,
                            Facebook, etc.).
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    3. PURPOSES OF DATA PROCESSING
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We process your data for the following lawful purposes:
                    <ul className="list-disc list-inside my-2">
                        <li>Legal Basis (GDPR)</li>
                        <li>Account creation and management</li>
                        <li>Contractual necessity</li>
                        <li>Subscription processing and payments</li>
                        <li>Contractual necessity</li>
                        <li>
                            Providing personalized audiobook recommendations
                        </li>
                        <li>Legitimate interest</li>
                        <li>Marketing and promotional communications</li>
                        <li>Consent</li>
                        <li>Fraud prevention and security monitoring</li>
                        <li>Legitimate interest/legal obligation</li>
                        <li>Compliance with legal obligations</li>
                        <li>Legal obligation</li>
                        <li>Customer support and inquiries</li>
                        <li>Legitimate interest</li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    4. USER RIGHTS (GDPR, DPDP, CCPA, UK GDPR, PIPEDA)
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    You have the following rights regarding your personal data:
                    <ul className="list-disc list-inside my-2">
                        <li>Right to Access: Request a copy of your data.</li>
                        <li>
                            Right to Rectification: Correct inaccurate or
                            incomplete data.
                        </li>
                        <li>
                            Right to Erasure: Request deletion of your data
                            (subject to legal limitations).
                        </li>
                        <li>
                            Right to Restrict Processing: Request restricted
                            processing under certain conditions.
                        </li>
                        <li>
                            Right to Data Portability: Obtain a copy of your
                            data in a machine-readable format.
                        </li>
                        <li>
                            Right to Object: Object to processing based on
                            legitimate interests.
                        </li>
                        <li>
                            Right to Withdraw Consent: Withdraw marketing or
                            other consent-based processing.
                        </li>
                        <li>
                            Right to Lodge a Complaint: File a complaint with
                            the data protection authority in your jurisdiction.
                        </li>
                        <li>
                            For data requests, email us at{" "}
                            <a href="mailto:info@kidskatha.com">
                                info@kidskatha.com
                            </a>
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    5. DATA SHARING AND DISCLOSURE
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We do not sell personal data. However, we may share data
                    with:
                    <ul className="list-disc list-inside my-2">
                        <li>
                            Service Providers: Payment processors, hosting
                            providers, customer support services.
                        </li>
                        <li>
                            Legal Authorities: If required by law, regulatory
                            request, or legal obligation.
                        </li>
                        <li>
                            Business Transfers: In case of a merger,
                            acquisition, or asset sale.
                        </li>
                        <li>
                            Marketing Partners: Ordinarily Not shared with any
                            third-party marketing companies. In the future if
                            the same changes, you will be notified of the same
                            and only with your consent.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    6. INTERNATIONAL DATA TRANSFERS
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We store and process data primarily in India. If data is
                    transferred outside India/EEA, we ensure:
                    <ul className="list-disc list-inside my-2">
                        <li>
                            Adequate safeguards (Standard Contractual Clauses
                            under GDPR).
                        </li>
                        <li>
                            Compliance with DPDP requirements for cross-border
                            data transfers.
                        </li>
                        <li>Secure mechanisms as per CCPA and PIPEDA.</li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    7. DATA SECURITY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We implement industry-standard security measures, including:
                    <ul className="list-disc list-inside my-2">
                        <li>
                            Encryption: Secure data transmission via SSL/TLS.
                        </li>
                        <li>
                            Access Controls: Restricted access to sensitive
                            data.
                        </li>
                        <li>
                            Anonymization & Pseudonymization: Where applicable.
                        </li>
                        <li>
                            Regular Security Audits: Routine assessments to
                            protect user data.
                        </li>
                        <li>
                            However, no method is 100% secure. Users are
                            responsible for safeguarding their login
                            credentials.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    8. COOKIES AND TRACKING TECHNOLOGIES
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            We use cookies to enhance user experience and
                            analytics.
                        </li>
                        <li>
                            Essential Cookies: Required for platform
                            functionality.
                        </li>
                        <li>
                            Analytics Cookies: Track usage patterns (Google
                            Analytics, etc.).
                        </li>
                        <li>
                            Marketing Cookies: For personalized ads (only with
                            consent).
                        </li>
                        <li>
                            Users can manage cookie preferences via their
                            browser settings.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    9. CHOICES YOU HAVE WHEN ACCESSING OUR PLATFORM
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            As described above, you can always choose not to
                            provide certain information, but then you might not
                            be able to access the full range of features of our
                            Platform.
                        </li>
                        <li>
                            You can alter certain information provided by you.
                        </li>
                        <li>
                            You can delete your account. However, for complying
                            with legal purposes, we will be retaining your data
                            for a maximum period of 7 years, subject to
                            territorial legislations.
                        </li>
                        <li>
                            {" "}
                            If you do not wish to receive promotional emails,
                            you can always unsubscribe from our newsletters and
                            also change this from your account settings. If you
                            are still not able to change this, you may contact
                            the Grievance Officer’s details given at the end of
                            this document.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    10. DATA RETENTION POLICY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We retain user data for as long as necessary for the
                    purposes stated in this policy. If an account is deleted,
                    data is removed except where required by law. Transaction
                    records may be retained for 7 years (legal compliance).
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    11. THIRD-PARTY LINKS
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    The Platform may contain links to third-party websites. We
                    are not responsible for their privacy practices. Users
                    should review third-party privacy policies before engaging
                    with such sites.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    12. CHILDREN’S PRIVACY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    Our Platform is not intended for children under 18 without
                    parental consent. If we discover data collected from a minor
                    without verification, we will delete it immediately. Minors
                    who access our platform are expected to use it under
                    parental guidance. Any information of minors provided by the
                    parents/guardians on our Platform shall be with their own
                    consent and risk.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    13. CHANGES TO THIS PRIVACY POLICY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We may update this policy periodically. Users will be
                    notified of significant changes via email or platform
                    notifications.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    14. CONTACT US
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed flex flex-col">
                    For any privacy-related inquiries, please contact us at:
                    <span className="flex gap-2 items-center">
                        <Mail className="size-4" /> Email:{" "}
                        <a href="mailto:info@kidskatha.com">
                            info@kidskatha.com
                        </a>
                    </span>
                    <span className="flex gap-2 items-center">
                        <MapPinHouse className="size-4" /> Address: 32/470,
                        Sector 3, Near KV-6, Pratap Nagar, Sanganer, Jaipur
                        302033
                    </span>
                </p>
            </div>
        </main>
    );
};

export default PrivacyPolicyPage;
