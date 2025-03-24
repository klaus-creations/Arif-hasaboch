import React from "react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-400 mb-6">
          Arif Hasab
        </h1>
        <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-4">
          A Space for Open Expression & Meaningful Conversations
        </h2>
        <p className="text-lg text-gray-400">
          Welcome to <strong className="text-emerald-500">Arif Hasab</strong>, a
          platform built for anyone and everyone who has something to say.
          Whether it s an idea that just struck you, a deep reflection on life,
          an inspiring story, or a thought-provoking question, this is your
          space to share and connect with like-minded individuals. We believe
          that every thought has the power to spark a conversation, ignite
          change, or simply provide comfort to someone who needed to hear it.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-4">
          Why We Created This Platform
        </h2>
        <p className="text-lg text-gray-400">
          In a world filled with endless noise,{" "}
          <strong className="text-gray-400">arif hasab</strong> was created as a
          space where thoughts—raw, unfiltered, and genuine—can thrive. Social
          media often prioritizes trends and engagement metrics, but here, we
          prioritize expression. We want to give people a place where they can
          speak their minds, be heard, and engage in meaningful discussions
          without fear of being drowned out by algorithms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-4">
          What Makes Us Different
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Open to Everyone
            </h3>
            <p className="text-lg text-gray-400">
              This platform isn’t about influencers, celebrities, or those with
              the loudest voices—it’s about you Whether you’re a student, a
              professional, an artist, or just someone who enjoys sharing their
              perspectives, this is your place to speak freely.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              No Hate, Just Thoughts
            </h3>
            <p className="text-lg text-gray-400">
              While we encourage free expression, we are firm on one thing:{" "}
              <strong className="text-gray-400 border-b-[1px] border-b-emerald-500/[.4] ">
                this is a hate-free zone
              </strong>
              . Our community is built on respect, and any form of hate speech,
              harassment, or discrimination is not tolerated. You’re free to
              express your opinions, but we ask that you do so with kindness and
              consideration for others.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Authenticity Over Virality
            </h3>
            <p className="text-lg text-gray-600">
              We believe that real thoughts matter more than just viral moments.
              There are no algorithms forcing you to compete for likes or
              engagement— just real people, real words, and real conversations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Anonymity & Privacy
            </h3>
            <p className="text-lg text-gray-600">
              We understand that some thoughts are best expressed without
              attaching a name to them. That’s why we give you the option to
              post anonymously if you choose. Your voice matters, whether or not
              your name is attached to it.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-4">
          What Can You Do Here?
        </h2>
        <ul className="list-disc pl-6 text-lg text-gray-600">
          <li>
            <strong className="text-emerald-800">Share Your Thoughts</strong> –
            Post anything that’s on your mind, whether it’s an inspiring quote,
            a deep reflection, or a random idea you’d like to explore.
          </li>
          <li>
            <strong className="text-emerald-800">
              Engage in Conversations
            </strong>{" "}
            – Reply to posts, add your perspective, and keep the discussion
            going.
          </li>
          <li>
            <strong className="text-emerald-800">Discover New Ideas</strong> –
            Browse through thoughts from people all over the world and gain
            fresh insights.
          </li>
          <li>
            <strong className="text-emerald-800">
              Follow Topics That Interest You
            </strong>{" "}
            – Stay engaged with the subjects that matter most to you.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600">
          This is more than just an app—it’s a movement towards{" "}
          <strong className="text-gray-400">
            authenticity, expression, and meaningful dialogue
          </strong>
          . We invite you to be a part of it. Sign up, share your thoughts, and
          connect with others who, just like you, have something valuable to
          say.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          Welcome from <strong className="text-emerald-500">Niklaus</strong>
        </p>
      </section>

      <section className="bg-gray-900 p-8 mt-12 rounded-lg shadow-md shadow-red-500/[.1]">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-4000 mb-4">
          Platform Guidelines
        </h2>
        <div className="space-y-4 text-lg text-gray-400">
          <div>
            <h3 className="font-semibold text-gray-300">1. Respect Others</h3>
            <p>
              Everyone deserves respect. Disagreeing with someone is fine, but
              be sure to express yourself respectfully. Personal attacks or
              inflammatory language will not be tolerated.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300">2. Stay On-Topic</h3>
            <p>
              Keep the conversation focused on the topic at hand. This will help
              ensure a more meaningful and productive discussion.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300">3. No Spam</h3>
            <p>
              Avoid promoting unrelated content, ads, or spam. Our community is
              about genuine conversations, not sales pitches.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300">
              4. Protect Your Privacy
            </h3>
            <p>
              While we offer anonymity, always be mindful of what personal
              information you share, even if you choose to post anonymously.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
