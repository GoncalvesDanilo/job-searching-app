import axios from 'axios';
import { useState, useEffect } from 'react';
import { RAPID_API_KEY } from '@env';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = async (queryOverride) => {
    setIsLoading(true);

    if (queryOverride) {
      options.params = { ...queryOverride };
    }

    try {
      const response = await axios.request(options);
      // let response = {};

      // response['data'] = [
      //   {
      //     employer_company_type: null,
      //     employer_logo: null,
      //     employer_name: 'Emergent Software',
      //     employer_website: 'http://www.ratbaggames.com',
      //     job_apply_is_direct: false,
      //     job_apply_link:
      //       'https://jobs.emergentsoftware.net/o/senior-software-engineer-javascript-react-native',
      //     job_apply_quality_score: 0.7504,
      //     job_benefits: null,
      //     job_city: 'Falls Church',
      //     job_country: 'US',
      //     job_description:
      //       '• * This is a direct hire position for one of our clients. This position is a fully remote role. Candidates must be able to work in the US without sponsorship.**\n\nAre you a highly skilled React Native Software Engineer with a passion for creating cutting-edge mobile applications? Join an innovative team and make a significant impact in the development of a next-generation mobile projects!\nResponsibilities:\n• Utilize your extensive experience in React Native to design, develop, and maintain high-quality mobile applications for iOS and Android platforms.\n• Troubleshoot and resolve issues within iOS and Android codebases, ensuring optimal performance and a seamless user experience.\n• Collaborate with the development team to consume and contribute to GraphQL and REST APIs, enabling efficient data interactions for our mobile applications.\n• Implement robust mobile application security measures to protect user data and ensure compliance with industry best practices.\n• Communicate effectively with stakeholders, including project managers, designers, and other team members, to understand requirements and provide progress updates on development tasks.\n• Embrace test-driven methodologies to design and execute comprehensive tests, ensuring the reliability and stability of the codebase.\n• Expertly utilize code versioning tools, such as Git, to manage and collaborate on code changes effectively.\n• Demonstrate an expert level understanding of React Native and ReactJS, employing best practices to build scalable, maintainable, and performant applications.\n• Leverage your expertise in Object-Oriented Design & Programming to write reusable, clean, and readable code, ensuring long-term maintainability.\n• Independently tackle new and challenging React Native issues and contribute to open-source libraries when necessary, showcasing your problem-solving skills and innovation.\n• Create and maintain continuous integration and delivery pipelines for React Native applications, optimizing the deployment workflow and ensuring efficient releases.\n• Foster a positive and collaborative team environment, displaying a can-do attitude and a hunger for learning and improvement.\nQualifications:\nRequired:\n● 5+ years of professional experience working with React Native\n● Proficient in troubleshooting iOS and Android codebases\n● Proficient in consuming and contributing to GraphQL and REST apis\n● Proficient with mobile application security\n● Proficient in communicating with stakeholders\n● Expert with test-driven methodologies\n● Expert in using code versioning tools, such as Git\n● Expert level understanding of React Native, as well as ReactJS\n● Expert level understanding of Object Oriented Design & Programming and writing reusable, readable code\n● Ability to work independently through new and difficult React Native issues and contribute to libraries as needed\n● Ability to create and maintain continuous integration and delivery of React Native applications\n● A team player with a positive mindset and can-do attitude with a hunger to learn and a Forensic attention to detail.\nPreferred:\n● Experience working with Swift, Objective C, and Java a plus\n● Familiarity with Appcenter, Fastlane and AWS services\n● Familiarity with continuous delivery, DevOps, continuous integration\n● Familiarity with application performance monitoring\n● Dedication to improving processes and team performance\n● Proficient with Mac OSX/Linux operating systems, especially command line\nOur Vetting Process\nAt Emergent Software, we work hard to find the software engineers who are the right fit for our clients. Here are the steps of our vetting process for this position:\n• Application (5 minutes)\n• Online Assessment & Short Algorithm Challenge (40-60 minutes)\n• Initial Phone Interview (30-45 minutes)\n• 3 Interviews with the Client\n• Job Offer!\nIn this role, you will be responsible for designing, developing, and maintaining mobile applications.',
      //     job_employment_type: 'FULLTIME',
      //     job_experience_in_place_of_education: false,
      //     job_google_link:
      //       'https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+native+developer&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+native+developer&htidocid=WUpxWFYJkx8AAAAAAAAAAA%3D%3D',
      //     job_highlights: {
      //       Qualifications: ['Array'],
      //       Responsibilities: ['Array'],
      //     },
      //     job_id: 'WUpxWFYJkx8AAAAAAAAAAA==',
      //     job_is_remote: true,
      //     job_job_title: null,
      //     job_latitude: 38.882336,
      //     job_longitude: -77.17109,
      //     job_max_salary: 135000,
      //     job_min_salary: 120000,
      //     job_offer_expiration_datetime_utc: null,
      //     job_offer_expiration_timestamp: null,
      //     job_onet_job_zone: '4',
      //     job_onet_soc: '15113200',
      //     job_posted_at_datetime_utc: '2023-08-02T00:00:00.000Z',
      //     job_posted_at_timestamp: 1690934400,
      //     job_posting_language: 'en',
      //     job_publisher: 'Emergent Software',
      //     job_required_education: {
      //       associates_degree: false,
      //       bachelors_degree: false,
      //       degree_mentioned: false,
      //       degree_preferred: false,
      //       high_school: false,
      //       postgraduate_degree: false,
      //       professional_certification: false,
      //       professional_certification_mentioned: false,
      //     },
      //     job_required_experience: {
      //       experience_mentioned: true,
      //       experience_preferred: true,
      //       no_experience_required: false,
      //       required_experience_in_months: 60,
      //     },
      //     job_required_skills: null,
      //     job_salary_currency: 'USD',
      //     job_salary_period: 'YEAR',
      //     job_state: 'VA',
      //     job_title: 'React Native Developer',
      //   },
      // ];

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (refetchQuery) => {
    setIsLoading(true);
    fetchData(refetchQuery);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
