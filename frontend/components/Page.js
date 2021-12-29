import styled from "styled-components";
import Header from "./Header";

const InnerStyles = styled.div`
  max-width: var(--maxwidth);
  margin: 0 12%;
  padding: 2rem;

`;

export default function Page({ children }) {
    return (
        <div>
            <Header />
            <InnerStyles>{children}</InnerStyles>
        </div>
    )
}

Page.propTypes = {
    children: propTypes.arrayOf(propTypes.node),
  };