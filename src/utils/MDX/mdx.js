import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function CustomMDX(props) {

  function customImage(props) {
    return <Image {...props} />;
  }

  function customLink(props) {
    return <Link {...props} />;
  }

  let components = {
    Image: customImage,
    a: customLink
  };

  return (
    <div className="prose">
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
}
