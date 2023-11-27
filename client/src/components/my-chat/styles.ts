import styled from 'styled-components';

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 50vh;
    position: relative;
    overflow-x: hidden;
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    bottom: 0;
    padding: 20px 30px;
    position: absolute;
`;

export const Input = styled.input`
    width: 15rem;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    outline: none;
`;

export const Button = styled.button`
    height: 38px;
    border: 1px solid #ccc;
    background-color: #ccc;
    cursor: pointer;
    margin-left: 10px;
    padding: 0 20px;
    color: #000;
    border: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow: hidden;
  border: 1px solid #ccc;
`;

export const Message = styled.div`
  display: flex;
  width: 18rem;
  margin-bottom: 20px;
  position: relative;

  ul {
    list-style: none;
    position: absolute;

    li:nth-child(odd) {
      color: #529982;
    }
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
`;


