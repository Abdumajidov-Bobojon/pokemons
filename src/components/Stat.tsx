import styled from "styled-components"

const Stat = () => {
    return (
        <Wrapper>
            <div className="name">HP</div>
            <span></span>
            <div className="percent">035</div>

            <div className="bar">
                <div className="fill"></div>
            </div>
        </Wrapper>
    )
}

export default Stat

const Wrapper = styled.div`
    height: 25px;
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 0 20px;

    .name {
        font-size: 14px;
        line-height: 16px;
        color: #F9CF30;
        font-weight: bold;
        width: 45px;
        text-align: right;
    }

    span {
        display: inline-block;
        width: 2px;
        height: 25px;
        background-color: #E0E0E0;
    }

    .bar {
        background: #F9CF3033;
        height: 5px;
        width: 100%;
        border-radius: 4px;
        overflow: hidden;

        .fill {
            height: 5px;
            width: 50%;
            background-color: #F9CF30;
        }
    }
`;