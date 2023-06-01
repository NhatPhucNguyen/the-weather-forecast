import styled from "styled-components"

const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: auto;
    padding-bottom: 1em;
`

const Footer = () => {
  return (
    <FooterContainer>
        <h6>&copy; Nhat Phuc Nguyen</h6>
    </FooterContainer>
  )
}

export default Footer