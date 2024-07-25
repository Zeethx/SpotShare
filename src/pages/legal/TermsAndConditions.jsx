import React from "react";
import { Helmet } from "react-helmet";

function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>SpotShare | Terms and Conditions</title>
                <meta name="description" content="SpotShare's terms and conditions for using the website and services." />
                <meta name="keywords" content="terms and conditions, SpotShare, parking spaces, rent parking" />
            </Helmet>
            <div className="max-w-[80vw] mx-auto bg-white p-8 rounded-lg shadow font-outfit">
                <h1 className="text-4xl font-extrabold mb-4 text-center">
                    Terms and Conditions
                </h1>
                <p className="text-gray-700 mb-2 text-xs text-right">
                    <strong>Last Updated:</strong> 2024/07/24
                </p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        1. Introduction
                    </h2>
                    <p className="text-gray-700 mb-2">
                        1.1 These terms and conditions govern your use of
                        SpotShare's website and services, including our mobile
                        applications and any other related services provided by
                        SpotShare (collectively, the "Services").
                    </p>
                    <p className="text-gray-700 mb-2">
                        1.2 By using our Services, you agree to these terms and
                        conditions, and our Privacy Policy, which can be found
                        at{" "}
                        <a href="/privacy" className="text-blue-500">
                            spotshare.ca/privacy
                        </a>
                        . If you do not agree with these terms, you should not
                        use the Services.
                    </p>
                    <p className="text-gray-700 mb-2">
                        1.3 SpotShare reserves the right to amend these terms at
                        any time. Any changes will be posted on this page, and
                        it is your responsibility to review these terms
                        regularly. Your continued use of the Services after
                        changes are posted constitutes your acceptance of the
                        modified terms.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        2. Definitions
                    </h2>
                    <p className="text-gray-700 mb-2">
                        - "SpotShare" refers to the web and mobile application
                        services provided by SpotShare, located at spotshare.ca.
                    </p>
                    <p className="text-gray-700 mb-2">
                        - "User" refers to any individual who uses the SpotShare
                        services, including those who rent out their parking
                        spaces ("Space Providers") and those who book parking
                        spaces ("Space Seekers").
                    </p>
                    <p className="text-gray-700 mb-2">
                        - "Parking Space" refers to any parking spot listed on
                        SpotShare by a Space Provider.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        3. Use of Services
                    </h2>
                    <p className="text-gray-700 mb-2">
                        3.1 <strong>Eligibility:</strong> To use our Services,
                        you must be at least 18 years old and have the legal
                        authority to enter into these terms.
                    </p>
                    <p className="text-gray-700 mb-2">
                        3.2 <strong>Account Registration:</strong> To use
                        certain features of the Services, you may be required to
                        create an account and provide accurate, current, and
                        complete information. You are responsible for
                        maintaining the confidentiality of your account
                        credentials and for all activities that occur under your
                        account.
                    </p>
                    <p className="text-gray-700 mb-2">
                        3.3 <strong>Account Termination:</strong> SpotShare
                        reserves the right to terminate or suspend your account
                        at any time, without notice, for conduct that we believe
                        violates these terms, is harmful to other Users of the
                        Services, or is otherwise objectionable.
                    </p>
                    <p className="text-gray-700 mb-2">
                        3.4 <strong>Prohibited Uses:</strong> You agree not to
                        use the Services for any unlawful purpose, or in any way
                        that could harm SpotShare, other Users, or any third
                        party. Prohibited activities include, but are not
                        limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>Harassing, abusing, or harming another person;</li>
                        <li>
                            Providing false, misleading, or inaccurate
                            information;
                        </li>
                        <li>Using automated means to use the Services;</li>
                        <li>
                            Attempting to interfere with the proper functioning
                            of the Services.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        4. Booking and Payment
                    </h2>
                    <p className="text-gray-700 mb-2">
                        4.1 <strong>Booking Parking Spaces:</strong> Space
                        Seekers can book available Parking Spaces through the
                        SpotShare platform. The booking is confirmed once the
                        payment is processed.
                    </p>
                    <p className="text-gray-700 mb-2">
                        4.2 <strong>Payment Terms:</strong> Payment for the
                        booking must be made through the SpotShare platform. We
                        accept various forms of payment, as detailed on our
                        website. You agree to pay all charges incurred by your
                        use of the Services and any applicable taxes.
                    </p>
                    <p className="text-gray-700 mb-2">
                        4.3 <strong>Cancellation and Refunds:</strong>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>
                            <strong>Cancellation by Space Seekers:</strong>{" "}
                            Cancellations by Space Seekers are subject to the
                            following refund policy:
                            <ul className="list-disc list-inside text-gray-700 ml-6 mb-2">
                                <li>
                                    Full refund if canceled more than 48 hours
                                    before the booking start time.
                                </li>
                                <li>
                                    50% refund if canceled between 24 to 48
                                    hours before the booking start time.
                                </li>
                                <li>
                                    No refund if canceled less than 24 hours
                                    before the booking start time.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Cancellation by Space Providers:</strong>{" "}
                            Space Providers may cancel bookings under certain
                            circumstances as outlined in our cancellation
                            policy. Repeated cancellations by Space Providers
                            may result in penalties or suspension of their
                            account.
                        </li>
                        <li>
                            <strong>Force Majeure:</strong> SpotShare will not
                            be liable for any cancellations or changes due to
                            events beyond our control, such as natural
                            disasters, government actions, or other emergencies.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        5. Space Provider Terms
                    </h2>
                    <p className="text-gray-700 mb-2">
                        5.1 <strong>Listing Parking Spaces:</strong> Space
                        Providers can list their Parking Spaces on SpotShare by
                        providing accurate and detailed information about the
                        space, including location, availability, pricing, and
                        any specific terms or conditions.
                    </p>
                    <p className="text-gray-700 mb-2">
                        5.2 <strong>Space Provider Responsibilities:</strong>{" "}
                        Space Providers must ensure that their listed Parking
                        Spaces are available as described and must comply with
                        all relevant laws and regulations. They must also
                        maintain the space in a clean and safe condition.
                    </p>
                    <p className="text-gray-700 mb-2">
                        5.3 <strong>Payment to Space Providers:</strong>{" "}
                        SpotShare will remit payments to Space Providers for
                        bookings of their Parking Spaces, minus any applicable
                        fees, as detailed in our payment policies. Payments will
                        be processed in accordance with the schedule and methods
                        outlined on our website.
                    </p>
                    <p className="text-gray-700 mb-2">
                        5.4 <strong>Disputes and Claims:</strong> In case of
                        disputes or claims related to the Parking Spaces, Space
                        Providers are responsible for resolving these issues
                        directly with the Space Seekers. SpotShare may, at its
                        discretion, facilitate communication between the parties
                        but is not responsible for resolving disputes.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        6. Liability and Disclaimers
                    </h2>
                    <p className="text-gray-700 mb-2">
                        6.1 <strong>No Warranty:</strong> SpotShare provides the
                        Services on an "as is" and "as available" basis, without
                        any warranties of any kind. We do not warrant that the
                        Services will be uninterrupted, error-free, or secure.
                        To the fullest extent permitted by law, we disclaim all
                        warranties, whether express or implied, including the
                        warranties of merchantability, fitness for a particular
                        purpose, and non-infringement.
                    </p>
                    <p className="text-gray-700 mb-2">
                        6.2 <strong>Limitation of Liability:</strong> To the
                        maximum extent permitted by law, SpotShare will not be
                        liable for any indirect, incidental, special,
                        consequential, or punitive damages, or any loss of
                        profits or revenues, whether incurred directly or
                        indirectly, or any loss of data, use, goodwill, or other
                        intangible losses, resulting from:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>Your use of or inability to use the Services;</li>
                        <li>
                            Any conduct or content of any third party on the
                            Services;
                        </li>
                        <li>Any content obtained from the Services;</li>
                        <li>
                            Unauthorized access, use, or alteration of your
                            transmissions or content.
                        </li>
                    </ul>
                    <p className="text-gray-700 mb-2">
                        6.3 <strong>Indemnification:</strong> You agree to
                        defend, indemnify, and hold harmless SpotShare and its
                        officers, directors, employees, and agents from and
                        against any claims, liabilities, damages, losses, and
                        expenses, including, without limitation, reasonable
                        legal and accounting fees, arising out of or in any way
                        connected with:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>Your access to or use of the Services;</li>
                        <li>Your violation of these terms;</li>
                        <li>
                            Your infringement of any intellectual property or
                            other rights of any third party.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        7. User Conduct
                    </h2>
                    <p className="text-gray-700 mb-2">
                        7.1 <strong>User Responsibilities:</strong> Users are
                        responsible for their conduct and activities on the
                        SpotShare platform. You agree to comply with all
                        applicable laws and regulations when using our Services.
                    </p>
                    <p className="text-gray-700 mb-2">
                        7.2 <strong>Prohibited Activities:</strong> Users must
                        not engage in any activities that are harmful,
                        fraudulent, or otherwise objectionable, as determined by
                        SpotShare in its sole discretion. This includes, but is
                        not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>
                            Misrepresenting your identity or affiliation with
                            any person or entity;
                        </li>
                        <li>
                            Using the Services for any commercial purpose not
                            expressly permitted by SpotShare;
                        </li>
                        <li>
                            Interfering with or disrupting the Services or the
                            servers or networks connected to the Services.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        8. Intellectual Property
                    </h2>
                    <p className="text-gray-700 mb-2">
                        8.1 <strong>Ownership:</strong> The Services and all
                        rights therein are and shall remain SpotShare's property
                        or the property of SpotShare's licensors. Neither these
                        terms nor your use of the Services convey or grant to
                        you any rights:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        <li>
                            In or related to the Services, except for the
                            limited license granted;
                        </li>
                        <li>
                            To use or reference in any manner SpotShare's
                            company names, logos, product and service names,
                            trademarks, or services marks.
                        </li>
                    </ul>
                    <p className="text-gray-700 mb-2">
                        8.2 <strong>Content License:</strong> By submitting any
                        content (including but not limited to, user reviews,
                        feedback, images) to SpotShare, you grant us a
                        worldwide, perpetual, irrevocable, royalty-free,
                        transferable license, with the right to sublicense, to
                        use, copy, modify, create derivative works of,
                        distribute, publicly display, publicly perform, and
                        otherwise exploit in any manner such content in all
                        formats and distribution channels now known or hereafter
                        devised (including in connection with the Services and
                        SpotShare's business and on third-party sites and
                        services), without further notice to or consent from
                        you, and without the requirement of payment to you or
                        any other person or entity.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        9. Governing Law and Dispute Resolution
                    </h2>
                    <p className="text-gray-700 mb-2">
                        9.1 <strong>Governing Law:</strong> These terms and
                        conditions are governed by and construed in accordance
                        with the laws of Canada, without regard to its conflict
                        of law principles.
                    </p>
                    <p className="text-gray-700 mb-2">
                        9.2 <strong>Dispute Resolution:</strong> Any disputes
                        arising out of or relating to these terms or the
                        Services shall be resolved through binding arbitration
                        conducted by the Association, in accordance with its
                        rules and procedures. Judgment on the arbitration award
                        may be entered in any court having jurisdiction thereof.
                        This does not prevent SpotShare from seeking injunctive
                        relief in a court of competent jurisdiction.
                    </p>
                    <p className="text-gray-700 mb-2">
                        9.3 <strong>Class Action Waiver:</strong> You agree that
                        any dispute resolution proceedings will be conducted
                        only on an individual basis and not in a class,
                        consolidated, or representative action.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        10. Liability Disclaimer
                    </h2>
                    <p className="text-gray-700 mb-2">
                        SpotShare provides the Services on an "as is" and "as
                        available" basis. We make no representations or
                        warranties of any kind, express or implied, regarding
                        the use or the results of this website in terms of its
                        correctness, accuracy, reliability, or otherwise.
                        SpotShare shall have no liability for any interruptions
                        in the use of this Website. SpotShare disclaims all
                        warranties with regard to the information provided,
                        including the implied warranties of merchantability and
                        fitness for a particular purpose, and non-infringement.
                    </p>
                    <p className="text-gray-700 mb-2">
                        In no event shall SpotShare be liable for any damages
                        whatsoever, including, but not limited to, any direct,
                        indirect, incidental, special, consequential, or
                        exemplary damages arising out of or in any way relating
                        to your use of the Services or the use of or reliance
                        upon the Services or the content, even if advised of the
                        possibility of such damages.
                    </p>
                    <p className="text-gray-700 mb-2">
                        SpotShare will not be liable for any damages, loss, or
                        theft of property, including vehicles, while parked in a
                        space booked through our Services. The Space Providers
                        are solely responsible for their parking spaces and any
                        issues that may arise.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        11. Miscellaneous
                    </h2>
                    <p className="text-gray-700 mb-2">
                        11.1 <strong>Severability:</strong> If any provision of
                        these terms is found to be invalid, illegal, or
                        unenforceable, the remaining provisions will continue in
                        full force and effect.
                    </p>
                    <p className="text-gray-700 mb-2">
                        11.2 <strong>Entire Agreement:</strong> These terms
                        constitute the entire agreement between you and
                        SpotShare regarding the use of the Services and
                        supersede any prior agreements between you and SpotShare
                        relating to your use of the Services.
                    </p>
                    <p className="text-gray-700 mb-2">
                        11.3 <strong>Waiver:</strong> No waiver of any term of
                        these terms shall be deemed a further or continuing
                        waiver of such term or any other term, and SpotShare's
                        failure to assert any right or provision under these
                        terms shall not constitute a waiver of such right or
                        provision.
                    </p>
                    <p className="text-gray-700 mb-2">
                        11.4 <strong>Assignment:</strong> You may not assign or
                        transfer these terms, by operation of law or otherwise,
                        without SpotShare's prior written consent. Any attempt
                        by you to assign or transfer these terms, without such
                        consent, will be null and of no effect. SpotShare may
                        assign or transfer these terms, at its sole discretion,
                        without restriction. Subject to the foregoing, these
                        terms will bind and inure to the benefit of the parties,
                        their successors, and permitted assigns.
                    </p>
                    <p className="text-gray-700 mb-2">
                        11.5 <strong>Notices:</strong> SpotShare may provide
                        notifications to you as required by law or for marketing
                        or other purposes via email to the primary email
                        associated with your account, by posting such notice on
                        our website, or by other appropriate means. SpotShare is
                        not responsible for any automatic filtering you or your
                        network provider may apply to email notifications.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        11. Contact Information
                    </h2>
                    <p className="text-gray-700 mb-2">
                        If you have any questions about these terms and
                        conditions, please contact us at:
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

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        12. Acknowledgment
                    </h2>
                    <p className="text-gray-700 mb-2">
                        By using the Services, you acknowledge that you have
                        read these terms and conditions, understand them, and
                        agree to be bound by them. If you do not agree to these
                        terms, do not use the Services.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default TermsAndConditions;
