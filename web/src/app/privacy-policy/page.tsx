import type { Metadata } from 'next';

import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <Layout static>
      <strong>Privacy Policy</strong>
      <p>
        Jakub built the Zradelnik app as a Free app. This SERVICE is provided by Jakub at no cost
        and is intended for use as is.
      </p>
      <p>
        This page is used to inform visitors regarding policies with the collection, use, and
        disclosure of Personal Information if anyone decided to use the Service.
      </p>
      <p>
        If you choose to use the Service, then you agree to the collection and use of information in
        relation to this policy. The Personal Information collected is used for providing and
        improving the Service.
      </p>
      <p>
        <strong>Information Collection and Use</strong>
      </p>
      <p>
        For a better experience, while using our Service, you may be required to provide certain
        personally identifiable information. The information requested will be retained on your
        device and is not collected in any way.
      </p>
      <p>
        <strong>Log Data</strong>
      </p>
      <p>
        Whenever you use the Service, in case of an error in the app, data and information is
        collected through third-party products on your phone called Log Data.
      </p>
      <p>
        <strong>Service Providers</strong>
      </p>
      <p>Third-party companies and individuals may be employed for the following reasons:</p>
      <ul>
        <li>To facilitate the Service;</li>
        <li>To provide the Service;</li>
        <li>To perform Service-related services;</li>
        <li>To assist in analyzing how the Service is used.</li>
      </ul>
      <p>
        <strong>Changes to This Privacy Policy</strong>
      </p>
      <p>
        The Privacy Policy may be updated from time to time. You are advised to review this page
        periodically for any changes.
      </p>
      <p>This policy is effective as of 2022-08-27</p>
    </Layout>
  );
}
