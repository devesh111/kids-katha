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
                    Welcome to Kids Katha ("Platform"), owned and operated by VAxpert Business
                    Solutions ("Company," "we," "us," or "our"). We value your privacy and are
                    committed to protecting your personal data. This Privacy Policy outlines how we
                    collect, use, store, share, and protect your information when you use our
                    Platform.
                </p>
                <p>
                    This Privacy Policy complies with the General Data Protection Regulation (GDPR),
                    Digital Personal Data Protection Act, 2023 (DPDP-India), California Consumer
                    Privacy Act (CCPA), UK GDPR, Personal Information Protection and Electronic
                    Documents Act (PIPEDA-Canada), and other applicable global privacy laws.
                </p>
                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    1. DATA CONTROLLER
                </h2>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>1.1</strong> For users in the European Economic Area (EEA), UK, and other jurisdictions, VAxpert Business Solutions is the data controller responsible for your personal data.
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>1.2</strong> For inquiries related to data privacy, contact us at:
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
                            <strong>Account Information:</strong> Name, and either an email address or a phone number. An account is optional in the mobile app; listening and purchasing do not require one.
                        </li>
                        <li>
                            <strong>Payment Information: </strong> Handled entirely by the App Store, Google Play or our payment processor. We never receive or store card details.
                        </li>
                        <li>
                            <strong>User Preferences: </strong> Subscription choices and language settings.
                        </li>
                        <li>
                            <strong>Customer Support Data: </strong> Queries, complaints, or interactions with our support team.
                        </li>
                    </ul>
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>2.2</strong> Automatically Collected Information
                    <p>Website only. When you visit our website we collect IP address, browser type, operating system, pages visited, and cookie data as described in section 8.</p>
                    <p><strong>Mobile app.</strong><strong>Mobile app.</strong> The app collects only what the service needs in order to work:</p>
                    <ul className="list-disc list-inside my-2">
                        <li>
                            A randomly generated device identifier, used solely to allow one active device per subscription. This is not the advertising identifier and not a hardware identifier.
                        </li>
                        <li>
                            The stories marked as favourites.
                        </li>
                        <li>
                             Subscription status and purchase records from the app store.
                        </li>
                        <li>The chosen language.</li>
                    </ul>
                    <p>The app collects no location data, no browsing or listening history, and no analytics of any kind.</p>
                </p>
                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <strong>2.3</strong> Third-Party Data. We may receive
                    personal data from:
                    <ul className="list-disc list-inside my-2">
                        <li>Payment service providers.</li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    3. PURPOSES OF DATA PROCESSING
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We process your data for the following lawful purposes:
                    <ul className="list-disc list-inside my-2">
                        <li>Account creation and management (contractual necessity)</li>
                        <li>Subscription processing and payments (contractual necessity)</li>
                        <li> Fraud prevention and security monitoring (legitimate interest / legal obligation)</li>
                        <li>Compliance with legal obligations (legal obligation)</li>
                        <li>Customer support and inquiries (legitimate interest)</li>
                    </ul>
                </p>
                <p>
                    We do not profile users, do not personalise content from behaviour, and do not send marketing communications to children.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    4. USER RIGHTS (GDPR, DPDP, CCPA, UK GDPR, PIPEDA)
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    You have the following rights regarding your personal data:
                    <ul className="list-disc list-inside my-2">
                        <li>Right to Access: Request a copy of your data.</li>
                        <li>Right to Rectification: Correct inaccurate or incomplete data.</li>
                        <li>Right to Erasure: Request deletion of your data (subject to legal limitations).</li>
                        <li>Right to Restrict Processing: Request restricted processing under certain conditions.</li>
                        <li>Right to Data Portability: Obtain a copy of your data in a machine-readable format.</li>
                        <li>Right to Object: Object to processing based on legitimate interests.</li>
                        <li>Right to Withdraw Consent: Withdraw consent-based processing.</li>
                        <li>Right to Lodge a Complaint: File a complaint with the data protection authority in your jurisdiction.</li>
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
                    We do not sell personal data. However, we may share data with:
                    <ul className="list-disc list-inside my-2">
                        <li>
                            Service Providers: Payment processors, hosting providers, customer support services.
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
                            Advertising and marketing companies: never. We do not share data with ad networks, marketing companies or data brokers.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    6. INTERNATIONAL DATA TRANSFERS
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    App data is stored on Google Cloud servers in the United States. Website data is processed in India. Where data is transferred across borders we ensure:
                    <ul className="list-disc list-inside my-2">
                        <li>
                            Adequate safeguards (Standard Contractual Clauses under GDPR).
                        </li>
                        <li>
                            Compliance with DPDP requirements for cross-border data transfers.
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
                <p>This section applies to our website only. The mobile app uses no cookies and no tracking technologies.</p>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            We use cookies on our website to enhance user experience and analytics.
                        </li>
                        <li>
                            Essential Cookies: Required for website functionality..
                        </li>
                        <li>
                            Analytics Cookies: Track usage patterns on the website.
                        </li>
                        <li>
                            Users can manage cookie preferences via their browser settings.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    9. CHOICES YOU HAVE WHEN ACCESSING OUR PLATFORM
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    <ul className="list-disc list-inside my-2">
                        <li>
                            You can always choose not to provide certain information, but then you might not be able to access the full range of features of our Platform.
                        </li>
                        <li>
                            You can alter certain information provided by you.
                        </li>
                        <li>
                            You can delete your account at any time from within the app, at My Space - Delete account. For legal compliance, transaction records are retained for up to 7 years, subject to territorial legislation.
                        </li>
                        <li>
                            {" "}
                            If you do not wish to receive promotional emails you can unsubscribe from our newsletters and change this from your account settings. If you are unable to change it, contact the Grievance Officer whose details are given at the end of this document.
                        </li>
                    </ul>
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    10. DATA RETENTION POLICY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We retain user data for as long as necessary for the purposes stated in this policy. If an account is deleted, data is removed except where retention is required by law. Transaction records may be retained for 7 years (legal compliance).
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    11. THIRD-PARTY LINKS
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices. Users should review third-party privacy policies before engaging with such sites. The mobile app contains no third-party links.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    12. CHILDREN’S PRIVACY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    The Kids Katha mobile app is made for children and is listed in the Apple App Store Kids Category. It contains no advertising, no third-party analytics, and no tracking of any kind. We do not build profiles of children, do not personalise content using behavioural data, and do not send marketing communications to children.
                </p>
                <p>
                    Within the app we collect only what the service needs in order to work: an account, which is optional and only created if the user chooses to; the stories marked as favourites; subscription status; a randomly generated device identifier used solely to allow one active device per subscription; and the chosen language. Purchases are handled by the App Store or Google Play, and we never see payment details.
                </p>
                <p>
                    An account and all of its data can be deleted at any time from within the app, at My Space - Delete account.  Our website is intended for adults. Where a parent or guardian provides information on behalf of a child, that is done with their own consent.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    13. CHANGES TO THIS PRIVACY POLICY
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed">
                    We may update this policy periodically. Users will be notified of significant changes via email or platform notifications.
                </p>

                <h2 className="text-left w-full my-4 font-semibold text-lg">
                    14. CONTACT US
                </h2>

                <p className="text-left w-full my-2 tracking-wide leading-relaxed flex flex-col">
                    <span>Grievance Officer: Prachi Saxena</span>
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
