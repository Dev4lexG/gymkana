import { gymkana as q } from "@/utils/config"
import { Button, ButtonGroup, Link } from "@nextui-org/react"
const svg = {
    back: `<svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em"><path d="M15.5 19l-7-7 7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>`,
    to: `<svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" class="rotate-180"><path d="M15.5 19l-7-7 7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>`
}

function SectionPagination({ current: id, click }: { current: number, click: any }) {
    q[id]
    return (
        <ButtonGroup className="mx-auto w-[fit-content] flex">
            <Button onClick={click} isDisabled={q[id - 1] === undefined} href={'/gymkana/' + q[id - 1]?.urlName}
                as={Link}><span dangerouslySetInnerHTML={{ __html: svg.back }}></span>{q[id - 1]?.section}</Button>
            <Button onClick={click} isDisabled={q[id + 1] === undefined} href={'/gymkana/' + q[id + 1]?.urlName}
                as={Link}>{q[id + 1]?.section}<span dangerouslySetInnerHTML={{ __html: svg.to }}></span></Button>
        </ButtonGroup>
    )
}

export default SectionPagination;
