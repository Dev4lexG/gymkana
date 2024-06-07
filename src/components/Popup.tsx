import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input, RadioGroup, Radio, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";

function generateUID(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

function check(obj: object | string) {
    if (typeof (obj) == 'string')
        obj = {}
    const keys = ['uid', 'participantes', 'edad-promedio', 'motivacion', 'origen'];
    return keys.every(key => key in obj);

}

export function Popup() {
    let open = true

    const st = localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info') || '') : ''

    function setStorage(key: string, value: string) {
        st[key] = value
        reRandom(!random)
        localStorage.setItem('info', JSON.stringify(st))
    }

    if (st && check(st)) {
        open = false
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [value, setValue] = useState(1)

    const [random, reRandom] = useState(false)
    const [isDis, setDis] = useState(true)

    useEffect(() => {
        setDis(!check(st))
    }, [random])

    /* useEffect(() => {
        if (value < 0) {
            setValue(0)
        }
    }, [value]) */

    const isInvalid = useMemo(() => {
        return value < 0;
    }, [value]);

    useEffect(() => {
        if (!localStorage.getItem('info')) localStorage.setItem('info', JSON.stringify({ uid: generateUID(32) }))
        if (open) {
            onOpen();
        }
    }, []);



    return (
        <div className="flex flex-col gap-2">
            <Modal
                isDismissable={false}
                isOpen={isOpen}
                placement={'auto'}
                onOpenChange={onOpenChange}
                size="lg"
                backdrop="blur"
                hideCloseButton
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Antes de empezar</ModalHeader>
                            <ModalBody>
                                <p>Queremos saber un poco sobre tí</p>
                                <Input
                                    type="number"
                                    label="¿Cuántos estáis participando?"
                                    isRequired

                                    // @ts-expect-error
                                    value={value}
                                    defaultValue="1"
                                    labelPlacement="outside"
                                    placeholder="3.."
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    onValueChange={(value) => {


                                        if (+value > 0 || value == '') {
                                            // @ts-expect-error
                                            setValue(value)

                                            // @ts-expect-error
                                            setStorage('participantes', value || 1)

                                        } else setValue(0)
                                    }}

                                />

                                <Input
                                    type="text"
                                    label="¿De dónde sois?"
                                    isRequired
                                    labelPlacement="outside"
                                    placeholder="Soy / somos de..."
                                    onValueChange={(value) => {

                                        setStorage('origen', value)

                                    }}
                                />

                                <Select
                                    isRequired={true}
                                    label="¿Cuál es el promedio de edad?"
                                    labelPlacement="outside"
                                    className='max-w mt-1'
                                    aria-label="promedio"
                                    key="promedio"
                                    placeholder="Selecciona una..."

                                    onChange={(value) => {
                                        setStorage('edad-promedio', value.target.value)

                                    }}
                                >
                                    <SelectItem key="0" value="Menos de 18" >Menos de 18</SelectItem>
                                    <SelectItem key="18" value="18-35" >18-35</SelectItem>
                                    <SelectItem key="36" value="36-50" >36-50</SelectItem>
                                    <SelectItem key="50" value="Más de 50" >Más de 50</SelectItem>
                                </Select>

                                <RadioGroup
                                    isRequired
                                    label={<span className="text-foreground text-small">¿Qué te motiva más a participar en la gymkana?</span>}
                                    onValueChange={(value) => {
                                        setStorage('motivacion', value)
                                    }}
                                >
                                    <Radio value="diversion">Diversión</Radio>
                                    <Radio value="competencia">Competencia</Radio>
                                    <Radio value="actividad-grupal">Actividad en grupo</Radio>
                                </RadioGroup>


                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose} isDisabled={isDis
                                }>
                                    Siguiente
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}