"use client";

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import GradientHeading from './GradientHeading';
import ShimmerButton from "@/components/magicui/shimmer-button";
import SectionBackground from './SectionBackground';
import AvatarCircles from "@/components/magicui/avatar-circles"; // Import the AvatarCircles component

const faqs = [
  {
    question: "How long is the IELTS course?",
    answer: "Our IELTS course is designed to be completed in 4 weeks. However, we offer flexible options to accommodate different learning paces and schedules."
  },
  {
    question: "What materials are provided in the course?",
    answer: "We provide comprehensive study materials including practice tests, video lessons, worksheets, and access to our online learning platform with additional resources."
  },
  {
    question: "Are the classes live or pre-recorded?",
    answer: "We offer both live online classes and pre-recorded video lessons. Live classes allow for real-time interaction with instructors, while pre-recorded lessons offer flexibility in study time."
  },
  {
    question: "How many mock tests are included?",
    answer: "Our course includes unlimited access to mock tests. We believe in extensive practice to ensure you're well-prepared for the actual IELTS exam."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a money-back guarantee if you don't see improvement in your IELTS score after completing our course and following our study plan."
  }
];

export default function FAQSection() {
  return (
    <SectionBackground className="py-16" gradientStart="from-blue-50" gradientEnd="to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <GradientHeading as="h2" className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </GradientHeading>
        <dl className="space-y-6 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronUpIcon
                          className={`${open ? 'rotate-180 transform' : ''} h-6 w-6 text-blue-500`}
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <ShimmerButton
            className="bg-white text-white-600 hover:bg-blue-50"
            onClick={() => window.location.href = 'mailto:fizzielts24@gmail.com'}
          >
            Contact Us
          </ShimmerButton>
        </div>
      </div>
    </SectionBackground>
  );
}