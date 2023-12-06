import "./heading.css";
interface Props {
  tag: "h1" | "h2";
  content: string;
}

const Heading = ({ tag, content }: Props) => {
  const HeadingTag = tag;
  return <HeadingTag className={`tag-${tag}`}>{content}</HeadingTag>;
};

export default Heading;
