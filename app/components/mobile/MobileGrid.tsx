"use client"
import styled from "@emotion/styled";;

const MobileGridMainContainerr = styled.div`
    overflow: scroll;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(170deg,  rgba(156,36,141,1) 1%,rgba(0,0,0,1) 30%);
`;

const MobileGridFooterContainer = styled.div`
    width: 100%;
    height: 100%;
    backrgound-color:transparent;
`;

const MobileGridHeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    backrgound-color:transparent;
`;

const MHeader = ({ children }: { children?: React.ReactNode}) => {
    return (
        <MobileGridHeaderContainer>
            {children}
        </MobileGridHeaderContainer>
    )
}

const MMain = ({ children }: { children?: React.ReactNode}) => {
    return (
        <MobileGridMainContainerr>
            {children}
        </MobileGridMainContainerr>
    )
}

const MFooter = ({ children}: { children?: React.ReactNode}) => {
    return (
        <MobileGridFooterContainer>
            {children}
        </MobileGridFooterContainer>
    )
}

const MobileGrid = ({ children }: { children?: Array<React.ReactNode>}) => {
    return (
        <div id="mobile_background" className="w-full h-full m-[0 auto] overflow-hidden">

            <div id='mobile_header' className="fixed  left-0 w-full h-[10vh] bg-transparent" >
                {children && children[0]}
            </div>

            <div id="mobile_main" className="w-full h-[100vh]">
                {children && children[1]}
            </div>
            <div id="mobile_footer" className="absolute bottom-0 w-full h-[10vh] bg-transparent">
                {children && children[2]}
            </div>

        </div>
    )
}

export { MobileGrid, MHeader, MMain, MFooter }

