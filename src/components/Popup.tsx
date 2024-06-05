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

function check(obj: object) {
    const keys = ['uid', 'participantes', 'edad-promedio', 'motivacion'];
    return keys.every(key => key in obj);

}

export function Popup() {
    function setStorage(key: string, value: string) {
        const st = JSON.parse(localStorage.getItem('info') || '')

        st[key] = value

        localStorage.setItem('info', JSON.stringify(st))
    }
    let open = true

    const st = localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info') || '') : ''

    if (st && check(st)) {
        open = false
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [value, setValue] = useState(0)


    useEffect(() => {
        if (value < 0) {
            setValue(0)
        }
    }, [value])

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
                                    value={value == 0 ? '' : value}
                                    defaultValue="0"
                                    labelPlacement="outside"
                                    placeholder="3.."
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    onValueChange={(value) => {

                                        // @ts-expect-error
                                        setValue(value)

                                        setStorage('participantes', value)
                                            /* localStorage.setItem('info', JSON.stringify(JSON.parse(JSON.stringify('info')).participantes = value));
                                     */}}
                                />

                                <Select
                                    isRequired={true}
                                    label="¿Cuál es el promedio de edad?"
                                    labelPlacement="outside"
                                    className='max-w mt-1'
                                    aria-label="promedio"
                                    key="promedio"
                                    defaultSelectedKeys="0"

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
                                <Button color="primary" onPress={onClose} isDisabled={!check(st)}>
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