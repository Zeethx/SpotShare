import React from "react";
import { Footer } from "../../components";

function PrivacyPolicy() {
    return (
        <div>
            <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[70vw] mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-700 mb-2 text-right text-sm">
                        <strong>Last Updated:</strong> 2024/07/24
                    </p>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            1. Information We Collect
                        </h2>
                        <p className="text-gray-700 mb-2">
                            1.1 <strong>Personal Information:</strong> When you
                            register for an account or use our Services, we may
                            collect personal information, including but not limited
                            to your name, email address, phone number, payment
                            information, and any other information you provide to
                            us.
                        </p>
                        <p className="text-gray-700 mb-2">
                            1.2 <strong>Usage Data:</strong> We automatically
                            collect information about your use of our Services, such
                            as your IP address, browser type, operating system,
                            referring URLs, and information about your interaction
                            with our Services, including the pages you visit and the
                            actions you take.
                        </p>
                        <p className="text-gray-700 mb-2">
                            1.3 <strong>Location Data:</strong> We may collect
                            information about your location if you enable location
                            services on your device. This information is used to
                            provide location-based services, such as showing
                            available parking spaces near you.
                        </p>
                        <p className="text-gray-700 mb-2">
                            1.4 <strong>Cookies and Tracking Technologies:</strong>{" "}
                            We use cookies and similar tracking technologies to
                            track the activity on our Services and store certain
                            information. Cookies are files with a small amount of
                            data which may include an anonymous unique identifier.
                            You can instruct your browser to refuse all cookies or
                            to indicate when a cookie is being sent. However, if you
                            do not accept cookies, you may not be able to use some
                            portions of our Services.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-gray-700 mb-2">
                            2.1{" "}
                            <strong>To Provide and Maintain Our Services:</strong>{" "}
                            We use your information to provide, maintain, and
                            improve our Services, including to process transactions,
                            manage accounts, and provide customer support.
                        </p>
                        <p className="text-gray-700 mb-2">
                            2.2 <strong>To Communicate with You:</strong> We may use
                            your information to send you updates, marketing
                            communications, and other information that may be of
                            interest to you. You can opt out of receiving these
                            communications at any time.
                        </p>
                        <p className="text-gray-700 mb-2">
                            2.3 <strong>To Personalize Your Experience:</strong> We
                            use the information we collect to personalize your
                            experience with our Services, such as by showing you
                            relevant search results and advertisements.
                        </p>
                        <p className="text-gray-700 mb-2">
                            2.4 <strong>To Improve Our Services:</strong> We use the
                            information to understand how our users interact with
                            our Services, to improve the functionality and user
                            experience of our Services, and to develop new features.
                        </p>
                        <p className="text-gray-700 mb-2">
                            2.5{" "}
                            <strong>To Prevent Fraud and Ensure Security:</strong>{" "}
                            We use your information to detect, prevent, and respond
                            to fraud, abuse, security risks, and technical issues
                            that could harm SpotShare, our users, or the public.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            3. How We Share Your Information
                        </h2>
                        <p className="text-gray-700 mb-2">
                            3.1 <strong>With Service Providers:</strong> We may
                            share your information with third-party service
                            providers who perform services on our behalf, such as
                            payment processing, data analysis, email delivery,
                            hosting services, customer service, and marketing
                            assistance.
                        </p>
                        <p className="text-gray-700 mb-2">
                            3.2 <strong>With Other Users:</strong> When you use our
                            Services, certain information may be shared with other
                            users. For example, if you are a Space Provider, your
                            contact information may be shared with Space Seekers who
                            have booked your parking space.
                        </p>
                        <p className="text-gray-700 mb-2">
                            3.3 <strong>For Legal Reasons:</strong> We may disclose
                            your information if we are required to do so by law or
                            in response to valid requests by public authorities
                            (e.g., a court or a government agency).
                        </p>
                        <p className="text-gray-700 mb-2">
                            3.4 <strong>Business Transfers:</strong> If SpotShare is
                            involved in a merger, acquisition, or asset sale, your
                            information may be transferred as part of that
                            transaction. We will provide notice before your
                            information is transferred and becomes subject to a
                            different privacy policy.
                        </p>
                        <p className="text-gray-700 mb-2">
                            3.5 <strong>With Your Consent:</strong> We may share
                            your information with third parties when we have your
                            consent to do so.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            4. Data Security
                        </h2>
                        <p className="text-gray-700 mb-2">
                            4.1 We implement reasonable security measures to protect
                            the information we collect. However, no security system
                            is impenetrable, and we cannot guarantee the security of
                            our systems 100%. Unauthorized entry or use, hardware or
                            software failure, and other factors may compromise the
                            security of user information.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            5. Data Retention
                        </h2>
                        <p className="text-gray-700 mb-2">
                            5.1 We retain your personal information for as long as
                            necessary to provide our Services, comply with our legal
                            obligations, resolve disputes, and enforce our
                            agreements. The retention period may vary depending on
                            the nature of the information and the purpose for which
                            it was collected.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            6. Your Data Protection Rights
                        </h2>
                        <p className="text-gray-700 mb-2">
                            6.1 <strong>Access and Update:</strong> You have the
                            right to access and update your personal information at
                            any time by logging into your account or contacting us
                            directly.
                        </p>
                        <p className="text-gray-700 mb-2">
                            6.2 <strong>Right to Erasure:</strong> You have the
                            right to request that we delete your personal
                            information, subject to certain exceptions such as
                            compliance with legal obligations.
                        </p>
                        <p className="text-gray-700 mb-2">
                            6.3 <strong>Data Portability:</strong> You have the
                            right to request that we provide a copy of your personal
                            information in a structured, commonly used, and
                            machine-readable format.
                        </p>
                        <p className="text-gray-700 mb-2">
                            6.4 <strong>Right to Object:</strong> You have the right
                            to object to our processing of your personal information
                            under certain conditions.
                        </p>
                        <p className="text-gray-700 mb-2">
                            6.5 <strong>Right to Restrict Processing:</strong> You
                            have the right to request that we restrict the
                            processing of your personal information under certain
                            conditions.
                        </p>
                        <p className="text-gray-700 mb-2">
                            6.6 <strong>Withdrawal of Consent:</strong> If we are
                            processing your personal information based on your
                            consent, you have the right to withdraw your consent at
                            any time.
                        </p>
                        <p className="text-gray-700 mb-2">
                            To exercise any of these rights, please contact us at
                            spotshare3@gmail.com
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            7. Children's Privacy
                        </h2>
                        <p className="text-gray-700 mb-2">
                            Our Services are not directed to children under 13, and
                            we do not knowingly collect personal information from
                            children under 13. If we become aware that we have
                            collected personal information from a child under 13, we
                            will take steps to delete such information.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            8. International Data Transfers
                        </h2>
                        <p className="text-gray-700 mb-2">
                            SpotShare is based in Canada, and the information we
                            collect is governed by Canadian law. If you are
                            accessing our Services from outside Canada, please be
                            aware that your information may be transferred to,
                            stored, and processed in Canada where our servers are
                            located and our central database is operated. By using
                            our Services, you consent to any transfer of this
                            information.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            9. Changes to This Privacy Policy
                        </h2>
                        <p className="text-gray-700 mb-2">
                            We may update our Privacy Policy from time to time. We
                            will notify you of any changes by posting the new
                            Privacy Policy on this page. You are advised to review
                            this Privacy Policy periodically for any changes.
                            Changes to this Privacy Policy are effective when they
                            are posted on this page.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            10. Contact Us
                        </h2>
                        <p className="text-gray-700 mb-2">
                            If you have any questions about this Privacy Policy,
                            please contact us at:
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>SpotShare</strong>
                            <br />
                            <a
                                href="mailto:spotshare3@gmail.com"
                                className="text-blue-500"
                            >
                                spotshare3@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
