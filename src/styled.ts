import { bold, gray, green, italic, red, yellow } from "./styles"

type ChalkStyle = (input: string) => string

export function Styled(): StyledText {
    return new StyledText()
}

export class StyledText {
    private parts: string[] = []
    private currLine = ''
    private indent = 0
    private pendingNewlines = 0

    public Indent(spaces: number): this {
        this.indent = spaces
        return this
    }

    public Space(n = 1): this {
        this.ensureLineStart()
        this.currLine += ' '.repeat(n)
        return this
    }

    public Newline(): this {
        if (this.currLine) {
            this.parts.push(this.currLine)
            this.currLine = ''
        }
        this.pendingNewlines++
        return this
    }

    public ensureLineStart() {
        if (this.pendingNewlines > 0) {
            for (let i = 0; i < this.pendingNewlines; i++) {
                this.parts.push('')
            }
            this.pendingNewlines = 0
            this.currLine = ' '.repeat(this.indent)
        }
    }

    private write(style: ChalkStyle, text: string): this {
        this.ensureLineStart()
        this.currLine += style(text)
        return this
    }

    public Red(text: string): this {
        return this.write(red, text)
    }

    public Green(text: string): this {
        return this.write(green, text)
    }

    public Grey(text: string): this {
        return this.write(gray, text)
    }

    public Yellow(text: string): this {
        return this.write(yellow, text)
    }

    public Bold(text: string): this {
        return this.write(bold, text)
    }

    public Italic(text: string): this {
        return this.write(italic, text)
    }

    public BoldItalic(text: string): this {
        return this.write(bold.italic, text)
    }

    public Text(text: string): this {
        return this.write((s) => s, text) // no style
    }

    public With(...styles: ChalkStyle[]): StyledTextBuilder {
        return new StyledTextBuilder(this, styles)
    }

    public toString(): string {
        this.ensureLineStart()
        if (this.currLine) {
            this.parts.push(this.currLine)
            this.currLine = ''
        }
        return this.parts.join('\n')
    }
}

class StyledTextBuilder {
    constructor(
        private parent: StyledText,
        private styles: ChalkStyle[]
    ) { }

    public Text(text: string): StyledText {
        const composed = this.styles.reduce(
            (acc, style) => (txt) => style(acc(txt)),
            (txt: string) => txt
        )
        this.parent.ensureLineStart()
        this.parent['currLine'] += composed(text)
        return this.parent
    }
}
