import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";
import remarkGFM from "remark-gfm"

import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

export type Props = {
  data: {
    title: string;
    date: string;
    slug: string;
    tags: string[];
    author: string;
    description?: string;
  }
  source: MDXRemoteSerializeResult;
};

const components = { YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({ data, source }: Props) {
  return (
    <PostLayout
      title={data.title}
      date={parseISO(data.date)}
      slug={data.slug}
      tags={data.tags}
      author={data.author}
      description={data.description}
    >
      <MDXRemote {...source} components={components}/>
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const file = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");

  const { content, data } = matter(file, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });

  const source = await serialize(content, {mdxOptions: { remarkPlugins: [remarkGFM]}});

  return {
    props: { 
      data,
      source
    }
  };
};

