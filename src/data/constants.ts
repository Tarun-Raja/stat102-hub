import { Module, ScheduleItem } from "@/types";

export const MODULES: Module[] = [
  {
    key: "m1",
    title: "Module 1: Sampling and Estimation",
    desc: "Sampling distributions of the mean and variance, the Central Limit Theorem, methods of point estimation including Maximum Likelihood Estimation (MLE), and construction of confidence intervals for parameters of standard distributions.",
  },
  {
    key: "m2",
    title: "Module 2: Hypothesis Testing",
    desc: "Statistical tests for population means, variances, and proportions using z, t, F, and chi-square distributions. Testing scenarios include one-sample, two-sample, and paired comparisons, focusing on real-world decision-making based on data.",
  },
  {
    key: "m3",
    title: "Module 3: Goodness-of-Fit and Categorical Analysis",
    desc: "Goodness-of-fit testing for both known and estimated parameters, use of simulation-based methods, and evaluation of categorical data through contingency tables using the Chi-Square Test and Fisher's Exact Test, especially in small sample contexts.",
  },
  {
    key: "m4",
    title: "Module 4: Non-Parametric Methods",
    desc: "Distribution-free testing procedures including the Sign Test, Wilcoxon Signed Rank Test, and the Runs Test, designed to assess data without reliance on normality assumptions.",
  },
  {
    key: "m5",
    title: "Module 5: Statistical Quality Control",
    desc: "Control chart methodologies including X̄, S, p, and c charts, along with advanced process monitoring techniques such as Moving Average, Exponentially Weighted Moving Average (EWMA), and Cumulative Sum Control Charts (CUSUM).",
  },
];

export const OBJECTIVES = [
  "Introduce students to core concepts of sampling distributions and estimation, including the Central Limit Theorem, sample statistics, and confidence interval construction for real-world data analysis.",
  "Build competency in formulating and performing hypothesis tests for means, variances, proportions, and comparisons across populations, using parametric statistical methods.",
  "Enable students to assess model fit and relationships in categorical data, through goodness-of-fit tests, contingency table analysis, and simulation-based testing techniques.",
  "Familiarize students with non-parametric statistical tools that provide flexible alternatives to classical methods, useful when assumptions like normality are not met.",
  "Equip students with statistical tools for quality control and process monitoring, including the construction and interpretation of control charts and advanced monitoring techniques such as EWMA and CUSUM.",
];

export const SCHEDULE: ScheduleItem[] = [
  { unit: 1, topic: "Foundations of Sampling and Estimation", sessions: 6 },
  { unit: 2, topic: "Hypothesis Testing – Decisions with Data", sessions: 7 },
  { unit: 3, topic: "Analyzing Categories – Goodness-of-Fit and Beyond", sessions: 5 },
  { unit: 4, topic: "Non-Parametric Thinking – Statistics Without Assumptions", sessions: 5 },
  { unit: 5, topic: "Statistical Quality Control – Monitoring and Improving Processes", sessions: 7 },
];

export const PASSCODES = {
  Professor: "prof-2025-stat102",
  "Class Representative": "cr-2025-stat102",
};