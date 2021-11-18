import styled, { css } from "styled-components"

interface Props {
    name: string,
    stat: number,
    types: string[]
}

const Stat = ({ name, stat, types }: Props) => {
    return (
        <Wrapper stat={stat} types={types}>
            <div className="name">{name}</div>
            <span></span>
            <div className="stat">{stat}</div>

            <div className="bar">
                <div className="fill"></div>
            </div>
        </Wrapper>
    )
}

export default Stat

const Wrapper = styled.div<{ stat: number, types: string[] }>`
    height: 25px;
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 0 20px;

    .name {
        font-size: 12px;
        line-height: 16px;
        color: ${({ types, theme }) => theme.colors[types[0]]};
        font-weight: bold;
        min-width: 130px;
        text-align: right;
    }

    .stat {
        min-width: 30px;
        text-align: center;
    }

    span {
        display: inline-block;
        width: 2px;
        height: 25px;
        background-color: #E0E0E0;
    }

    .bar {
        ${({ types, theme }) => {
        if (types && types.length > 1) {
            return css`
                background: linear-gradient(135deg, ${theme.colors[types[0]] + "33"} 0%, ${theme.colors[types[1]] + "33"} 100%); 
                `
        } else if (types) {
            return css`
                background: ${theme.colors[types[0]] + "33"};  
                `
        }
    }}
        height: 5px;
        width: 100%;
        border-radius: 4px;

        .fill {
            height: 5px;
            max-width: ${({ stat }) => stat + "%"};
            border-radius: 4px;
            animation: grow 1s cubic-bezier(0.95, 0.05, 0.795, 0.035);


        ${({ types, theme }) => {
        if (types && types.length > 1) {
            return css`
                background: linear-gradient(135deg, ${theme.colors[types[0]]} 0%, ${theme.colors[types[1]]} 100%); 
                `
        } else if (types) {
            return css`
                background: ${theme.colors[types[0]]};  
                `
        }
    }}       
    
            @keyframes grow {
                from {
                    max-width: 0px;
                }
            }
        }
    }
`;