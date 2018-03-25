const colorPickerColors = ["#a2e4fd", "#31baff", "#0074fc", "#0000ff", "#b8b7fb", "#6685ff",
                           "#0051fc", "#0000bf", "#d9b7fa", "#9874fc", "#6839ff", "#431cbf", "blue", 
                           "#f9b6f9", "#fa73fa", "#da00cf", "#960086", "#faa3c0", "#fb5598", "magenta",
                           "#e70056", "#aa001a", "#f1d1ae", "#fb7853", "#fa3500", "#aa0c00", "red",
                           "#fde1a5", "#fea037", "#e75c00", "#8a1300", "#f9da71", "#fab900", "yellow",
                           "#ad7d00", "#503000", "#d7fa6f", "#b6fa00", "#00b900", "#007900", "green",
                           "#b6f9b5", "#51d94b", "#00aa00", "#006a00", "#b6f9d8", "#4ffa94", "cyan", 
                           "#00aa3e", "#005900", "#00fcfd", "#00e8d8", "#008888", "#003f59",
                           "#000000", "#585858", "#7c7c7c", "#9f9f9f", "#dadada", "#ffffff"
                          ];
const colors = colorPickerColors.map((color) => ({ color }));
class MySettings extends SettingsComponent {
  renderCollapsable({ key, label, content }) {
    const {
      settings: {
        [key]: openSetting = 'false'
      },
      settingsStorage
    } = this.props;
    const isOpen = JSON.parse(openSetting);
    return [
      <Button
        list
        label={ <Text bold align="left">{ isOpen ? '▼' : '►' }{'\u0009'}{label}</Text> }
        onClick={() => settingsStorage.setItem(key, isOpen ? 'false' : 'true') } />,
      isOpen && content
    ];
  }
  renderColorSelect({ title, settingsKey }) {
    return [
      <ColorSelect settingsKey={settingsKey} colors={colors} />
    ];
  }
  
  renderSlider({label, settingsKey, min, max}) {
    return [
      <Slider label={label} settingsKey={settingsKey} min={min} max={max} />
    ]
  }
  
  renderURL({label,settingsKey,URL}) {
    return [
      <TextInput label={label} settingsKey={settingsKey} name={settingsKey}/>
    ]
  }
render() {
    return (
    <Page>
      <Section title={<Text bold align="center">Long Shadow Settings</Text>}>
      </Section>
        
        
         <Select
          label={`Color theme preset`}
          settingsKey="colorThemePreset"
          options={[
            {name:"Default", value: {h1color: "#00fcfd", h2color: "#00fcfd", m1color: "#00fcfd", m2color: "#00fcfd", 
                  h1shadowcolor: "#fa3500", h2shadowcolor: "#0000ff", m1shadowcolor: "#00aa00", m2shadowcolor: "#fab900",
                  backgroundcolor: "#000000", optionscolor: "#fab900"}
            },
            {name:"Batman", value: {h1color: "yellow", h2color: "yellow", m1color: "yellow", m2color: "yellow", 
                  h1shadowcolor: "#000000", h2shadowcolor: "#000000", m1shadowcolor: "#000000", m2shadowcolor: "#000000",
                  backgroundcolor: "blue", optionscolor: "cyan"}
            },{name:"Google", value: {h1color: "#0051fc", h2color: "#fa3500", m1color: "#fea037", m2color: "#0051fc", 
                  h1shadowcolor: "#a2e4fd", h2shadowcolor: "#f1d1ae", m1shadowcolor: "#f9da71", m2shadowcolor: "#a2e4fd",
                  backgroundcolor: "#ffffff", optionscolor: "#000000"}
            },
            {name:"Greyscale", value: {h1color: "#585858", h2color: "#585858", m1color: "#7c7c7c", m2color: "#7c7c7c", 
                  h1shadowcolor: "#dadada", h2shadowcolor: "#dadada", m1shadowcolor: "#585858", m2shadowcolor: "#585858",
                  backgroundcolor: "#9f9f9f", optionscolor: "#ffffff"}
            },
            {name:"USA", value: {h1color: "#ffffff", h2color: "#ffffff", m1color: "#ffffff", m2color: "#ffffff", 
                  h1shadowcolor: "blue", h2shadowcolor: "red", m1shadowcolor: "red", m2shadowcolor: "blue",
                  backgroundcolor: "#000000", optionscolor: "cyan"}
            }       
          ]}
          
        />    
        
        
        <Section>
            { this.renderCollapsable({
              key: 'h1colorselection',
              label: 'Hour 1st digit color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'h1color'
                })
              ]
            })}
        </Section>
        
        <Section>
            { this.renderCollapsable({
              key: 'h2colorselection',
              label: 'Hour 2nd digit color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'h2color'
                })
              ]
            })}
        </Section>
  
         <Section>
            { this.renderCollapsable({
              key: 'm1colorselection',
              label: 'Minute 1st digit color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'm1color'
                })
              ]
            })}
        </Section>
  
         <Section>
            { this.renderCollapsable({
              key: 'm2colorselection',
              label: 'Minute 2nd digit color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'm2color'
                })
              ]
            })}
        </Section>
  
       <Section>
            { this.renderCollapsable({
              key: 'h1shadowcolorselection',
              label: 'Hour 1st digit shadow color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'h1shadowcolor'
                })
              ]
            })}
        </Section>
        
        <Section>
            { this.renderCollapsable({
              key: 'h2shadowcolorselection',
              label: 'Hour 2nd digit shadow color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'h2shadowcolor'
                })
              ]
            })}
        </Section>
  
         <Section>
            { this.renderCollapsable({
              key: 'm1shadowcolorselection',
              label: 'Minute 1st digit shadow color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'm1shadowcolor'
                })
              ]
            })}
        </Section>
  
         <Section>
            { this.renderCollapsable({
              key: 'm2shadowcolorselection',
              label: 'Minute 2nd digit shadow color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'm2shadowcolor'
                })
              ]
            })}
        </Section>
   
          <Section>
            { this.renderCollapsable({
              key: 'backgroundcolorselection',
              label: 'Background color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'backgroundcolor'
                })
              ]
            })}
        </Section>       
       
         <Section>
            { this.renderCollapsable({
              key: 'optionscolorselection',
              label: 'Options color',
              content: [
                this.renderColorSelect({
                  settingsKey: 'optionscolor'
                })
              ]
            })}
        </Section>       

        <Toggle settingsKey="showBattery" label="Show battery charge" />
        <Toggle settingsKey="showDate" label="Show date" />
        <Toggle settingsKey="showDOW" label="Show day of the week" />
       
        
       <Section title={<Text bold align="center">Donate!</Text>}>
      
      <Text italic>If you like this clockface and would like to see it further developed as well as other wonderful Ionic apps and faces created, please know - I run on coffee. It's an essential fuel for inspiration and creativity. So feel free to donate so I won't run out of fuel :) Thanks!
         </Text>
      
      <Link source="https://paypal.me/yuriygalanter">YURIY'S COFFEE FUND</Link> 
         
         </Section>   
      
      
      
   </Page>
    );
  }
}
registerSettingsPage(MySettings);