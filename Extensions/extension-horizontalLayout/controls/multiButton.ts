import * as app from 'tns-core-modules/application';
import { BaseObservable } from './observables/BaseObservable';
import { IControl } from './controls/IControl';

declare var android: any;
declare var com: any;
export class multiButtonExtension extends IControl {
	private _button1: any;
    private _button2: any;
    private _button3_beep: any;
    private _linearLayout: any;
    private _observable: BaseObservable;
    private _btnLayoutParams: any;
    
      public initialize(props: any): any {
        super.initialize(props);
        if (app.android) {
            this._btnLayoutParams = new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
                android.widget.LinearLayout.LayoutParams.FILL_PARENT
            );
            this._btnLayoutParams.setMargins(16, 0, 16, 0);

            this._linearLayout = new android.widget.LinearLayout(this.androidContext());
            this._linearLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
            this._button1 = new android.widget.Button(this.androidContext());
            this._button1.setText("Search");
            this._button2 = new android.widget.Button(this.androidContext());
            this._button2.setText("RESET");
            this._button3_beep = new android.widget.Button(this.androidContext());
            this._button3_beep.setText("Beep");
            this._button3_beep.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function () {
                    this._beep = new android.media.ToneGenerator(android.media.AudioManager.STREAM_MUSIC, 500);
                    this._beep.startTone(android.media.ToneGenerator.TONE_CDMA_HIGH_L, 1000);
                    alert("Beep clicked");
                }
            }));
            this._button1.setBackgroundColor(0xff0A6ED1);
            this._button1.setTextColor(0xffffffff);
            this._button1.setLayoutParams(this._btnLayoutParams);
            this._button2.setBackgroundColor(0xff0A6ED1);
            this._button2.setTextColor(0xffffffff);
            this._button2.setLayoutParams(this._btnLayoutParams);
            this._button3_beep.setBackgroundColor(0xff0A6ED1);
            this._button3_beep.setTextColor(0xffffffff);
            this._button3_beep.setLayoutParams(this._btnLayoutParams);
            this._linearLayout.addView(this._button1);
            this._linearLayout.addView(this._button2);
            this._linearLayout.addView(this._button3_beep);
        }
    }
    
    public view(): any {
        if (app.android) {
            this._linearLayout.setDividerPadding(10);
            this._linearLayout.setHorizontalGravity(android.view.Gravity.CENTER);
            this._linearLayout.setVerticalGravity(android.view.Gravity.CENTER_VERTICAL);
            return this._linearLayout;
        }
    }

    public viewIsNative() {
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        // do nothing
        return Promise.resolve();
    }
}