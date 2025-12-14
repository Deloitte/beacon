import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./HomePageFeatures.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Understand The Basics",
    Svg: "/img/home/ownership.svg",
    description: (
      <>
        The purpose of Beacon is to illustrate how to create a first-party analytics tracker where you own the code and your data. <br /> <Link to="/docs/overview">Read the overview here</Link>
      </>
    ),
  },
  {
    title: "Have Total Flexibility",
    Svg: "/img/home/control.svg",
    description: (
      <>
        Its critical to understand how to control the granularity of the data that you track and how that is processed from the point of collection. <br /> <Link to="/docs/basics/a-installation">Learn how to configure this here</Link>
      </>
    ),
  },
  {
    title: "Build On Top And Expand",
    Svg: "/img/home/fast.svg",
    description: (
      <>
        Beacon is made to be adjusted and expanded however you might need, with the common patterns for web tracking, without the complexity. <br /> <Link to="/docs/examples">See some examples here</Link>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={useBaseUrl(Svg)} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
