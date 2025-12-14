import React from 'react';
import clsx from "clsx";
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from '@site/src/components/HomePageFeatures/HomePageFeatures';



export default function Home(): JSX.Element {
  return (
    <Layout
      title="Beacon Documentation"
      description="Modern packaging to support the foundation for first-party web analytics"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--xl">
              <h1 className="hero__title">Beacon</h1>
              <p className="hero__subtitle">
                Modern packaging to support the foundation for first-party web analytics
              </p>
              <div className="margin-top--lg">
                
                <Link
                  className="button button--secondary button--lg margin--sm"
                  to={useBaseUrl('/docs/overview')}
                >
                  Read The Documentation
                </Link>
                <Link
                  className="button button--primary button--lg margin--sm"
                  to={useBaseUrl('/docs/examples/inline/out-of-the-box')}
                >
                  Play With An Example
                </Link>
              </div>
            </div>
          </div>
        </div>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}

